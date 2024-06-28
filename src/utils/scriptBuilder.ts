import { FormObject, Sbatch } from '@/context/formObject';
import { TreeStructureEnum } from './TreeStructureEnum';

export class ScriptBuilder {
  private formData: FormObject;

  constructor(formData: FormObject) {
    this.formData = formData;
  }

  private isEmpty(value: unknown): boolean {
    if (value === null || value === undefined || value === '') {
      return true;
    }
    if (Array.isArray(value)) {
      if (value.length === 1) {
        if (typeof value[0] === 'object' && value[0] !== null && 'key' in value[0] && value[0].key === '') {
          return true;
        }
        if (typeof value[0] === 'object' && value[0] !== null && 'file' in value[0] && value[0].file === null) {
          return true;
        }
      }
    }
    return false;
  }

  private checkIndex(value: number): string {
    if (value === 0) {
      return '';
    }
    return value.toString();
  }

  private spacer(): string {
    return '';
  }

  private writeHeaders(): string {
    return '#!/bin/bash';
  }

  private writeSBatchOptions(): string {
    if (this.isEmpty(this.formData.sbatch)) {
      return '# no SBATCH options for now';
    }
    return this.formData.sbatch.map((option: Sbatch) => `#SBATCH --${option.key}=${option.value}`).join('\n');
  }

  private writePurge(): string {
    return 'module purge';
  }

  private writeFiles(): string {
    if (this.isEmpty(this.formData.serverPath)) {
      return '#FILES= no server path informed';
    }
    if (this.isEmpty(this.formData.population.file)) {
      return '#FILES= no .zip file informed';
    }

    let filesCmd = 'FILES=' + this.formData.serverPath + TreeStructureEnum.INSTANCES + '/*';
    if (this.formData.population.params) {
      if (typeof this.formData.population.params === 'number') {
        filesCmd += ' | shuffle | head -' + this.formData.population.params;
      } else {
        filesCmd += ' | ' + this.formData.population.params;
      }
    }
    return filesCmd;
  }

  private writeLogs(): string {
    if (this.isEmpty(this.formData.serverPath)) {
      return '#LOGDIR= no server path informed';
    }
    return 'LOGDIR=' + this.formData.serverPath + TreeStructureEnum.LOGS + '/';
  }

  private writeJarPath(): string {
    if (this.isEmpty(this.formData.serverPath)) {
      return '#JARDIR= no server path informed';
    }
    return 'JARDIR=' + this.formData.serverPath + TreeStructureEnum.JAR;
  }

  private writeJavaLinesPath(): string {
    if (this.isEmpty(this.formData.serverPath)) {
      return '#JAVACOMMAND= no server path informed';
    }
    return (
      'JAVACOMMAND=' + this.formData.serverPath + 'commandLines.txt' + '\n' + 'mapfile -t commands < "$JAVACOMMAND"'
    );
  }

  private writeJVMArgs(): string {
    if (this.isEmpty(this.formData.jvmArgs)) {
      return '#JVMARGS= no JVMARGS informed';
    }
    return 'JVMARGS="' + this.formData.jvmArgs + '"';
  }

  private writeLoops(): string {
    let loop = 'for file in $FILES\ndo\n';

    if (this.isEmpty(this.formData.population.grepFilter)) {
      loop += '  #if grep -q "' + this.formData.population.grepFilter + '" $file; then\n';
    } else {
      loop += '  if grep -q "' + this.formData.population.grepFilter + '" $file; then\n';
    }

    loop += '\n';
    loop += '    echo "Processing $file file..."\n';
    loop += '    name="$(basename -- $file)"\n';
    loop += '\n';
    loop += '    for command in "${commands[@]}"\n    do\n';
    loop += '      command_to_run=$(eval echo "$command")\n';
    loop += '      echo "Running $command_to_run"\n';
    loop += '      srun -n1 -N1 $command_to_run\n';
    loop += '    done\n';
    loop += '\n';

    if (this.isEmpty(this.formData.population.grepFilter)) {
      loop += '  #fi\n';
    } else {
      loop += '  fi\n';
    }
    return loop + 'done';
  }

  private writeWait(): string {
    return 'wait';
  }

  private writeZip(): string {
    return 'zip -jr $SLURM_JOB_NAME-$SLURM_JOB_ID.zip $LOGDIR';
  }

  private generateCommandList(): string {
    let commandList = '';
    if (this.formData.jar[0].file === null) return commandList;

    let cpt = 0;

    this.formData.jar.forEach((jarFile) => {
      if (jarFile.multiValueArgs.length !== 0) {
        jarFile.multiValueArgs.forEach((arg) => {
          arg.values.forEach((val) => {
            commandList += 'java $JVMARGS -jar $JARDIR/' + jarFile.name + ' $file';
            if (jarFile.defaultArgs !== '') {
              commandList += ' ' + jarFile.defaultArgs;
            }
            commandList += ' ' + arg.paramName + ' ' + val;

            if (this.formData.logOptions) {
              commandList += ' > $LOGDIR/' + jarFile.name.split('.jar')[0] + '.$name' + cpt + '.out\n';
            } else {
              commandList += '\n';
            }
            cpt++;
          });
        });
      } else {
        commandList += 'java $JVMARGS -jar $JARDIR/' + jarFile.name + ' $file';

        if (jarFile.defaultArgs !== '') {
          commandList += ' ' + jarFile.defaultArgs;
        }
        if (this.formData.logOptions) {
          commandList += ' > $LOGDIR/' + jarFile.name.split('.jar')[0] + '.$name' + cpt + '.out\n';
        } else {
          commandList += '\n';
        }
        cpt++;
      }
    });

    return commandList.trim();
  }

  public export(): { bashScript: string; commandList: string } {
    const scriptParts: string[] = [
      this.writeHeaders(),
      this.spacer(),
      this.writeSBatchOptions(),
      this.spacer(),
      this.writePurge(),
      this.spacer(),
      this.writeFiles(),
      this.writeLogs(),
      this.writeJVMArgs(),
      this.writeJarPath(),
      this.writeJavaLinesPath(),
      this.spacer(),
      this.writeLoops(),
      this.spacer(),
      this.writeWait(),
      this.writeZip(),
    ];

    const bashScript = scriptParts.join('\n');
    if (this.formData.jar.length === 0) return { bashScript, commandList: '' };
    const commandList = this.generateCommandList();

    return { bashScript, commandList };
  }
}
