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

  private writeJavaLinesPath(): string {
    if (this.isEmpty(this.formData.serverPath)) {
      return '#JAVACOMMAND= no server path informed';
    }
    return 'JAVACOMMAND=' + this.formData.serverPath + TreeStructureEnum.LOGS + '/';
  }

  private writeJVMArgs(): string {
    if (this.isEmpty(this.formData.jvmArgs)) {
      return '#JVMARGS= no JVMARGS informed';
    }
    return 'JVMARGS="' + this.formData.jvmArgs + '"';
  }

  private checkIndex(value: number): string {
    if (value === 0) {
      return '';
    }
    return value.toString();
  }

  private writeLoopConfig(): string {
    let res = '';
    let cpt = 1;

    if (this.isEmpty(this.formData.jar)) {
      return '#$JARFILE= no .jar file informed\n#$ARGS=  ...\n#$declare -A VARIABLE_ARG=  ...\n';
    }

    this.formData.jar.forEach((jar) => {
      res +=
        '$JARFILE' +
        this.checkIndex(cpt) +
        '=' +
        this.formData.serverPath +
        TreeStructureEnum.JAR +
        '/' +
        jar.name +
        '\n';
      res += '$ARGS' + this.checkIndex(cpt) + '="' + jar.defaultArgs + '"\n';
      if (jar.multiValueArgs.length !== 0) {
        res += 'declare -A VARIABLE_ARG' + this.checkIndex(cpt) + '=(';

        jar.multiValueArgs.forEach((value) => {
          const values = value.values;
          values.forEach((val) => {
            res += '[' + val + ']="-' + value.paramName + ' ' + val + '" ';
          });
        });

        res += ')\n';
      }
      res += '\n';
      cpt++;
    });
    return res;
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

    let cpt = 1;
    this.formData.jar.forEach((jarFile) => {
      if (jarFile.multiValueArgs.length !== 0) {
        loop += '    for option in ${!VARIABLE_ARG' + this.checkIndex(cpt) + '[@]}\n';
        loop += '    do\n';
      }

      if (jarFile.multiValueArgs.length !== 0) {
        loop +=
          '      srun -n1 -N1 java $JVMARGS -jar $JARFILE' +
          this.checkIndex(cpt) +
          ' $file ${VARIABLE_ARG' +
          this.checkIndex(cpt) +
          '[$option]} $ARGS' +
          this.checkIndex(cpt) +
          ' > $LOGDIR/${name%%.*}' +
          this.checkIndex(cpt) +
          '.$option.out &\n';
      } else {
        loop +=
          '    srun -n1 -N1 java $JVMARGS -jar $JARFILE' +
          this.checkIndex(cpt) +
          ' $file $ARGS' +
          this.checkIndex(cpt) +
          ' > $LOGDIR/${name%%.*}' +
          this.checkIndex(cpt) +
          '.out &\n';
      }

      if (jarFile.multiValueArgs.length !== 0) {
        loop += '    done\n';
      }
      loop += '\n';
      cpt++;
    });

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
    return 'zip -jr $SLURM_JOB_NAME-$SLURM_JOB_ID.zip $LOGDIR ??';
  }

  private generateCommandList(): string {
    let commandList = '';

    let cpt = 1;
    this.formData.jar.forEach((jarFile) => {
      if (jarFile.multiValueArgs.length !== 0) {
        commandList += `# Commands for ${jarFile.name}\n`;
        jarFile.multiValueArgs.forEach((arg) => {
          arg.values.forEach((val) => {
            commandList += `srun -n1 -N1 java $JVMARGS -jar $JARFILE${this.checkIndex(cpt)} $file -${arg.paramName} ${val} $ARGS${this.checkIndex(cpt)} > $LOGDIR/\${name%%.*}${this.checkIndex(cpt)}.${val}.out\n`;
          });
        });
      } else {
        commandList += `srun -n1 -N1 java $JVMARGS -jar $JARFILE${this.checkIndex(cpt)} $file $ARGS${this.checkIndex(cpt)} > $LOGDIR/\${name%%.*}${this.checkIndex(cpt)}.out\n`;
      }
      commandList += '\n';
      cpt++;
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
      this.writeJavaLinesPath(),
      this.writeJVMArgs(),
      this.spacer(),
      this.writeLoopConfig(),
      this.writeLoops(),
      this.spacer(),
      this.writeWait(),
      this.writeZip(),
    ];

    const bashScript = scriptParts.join('\n');
    const commandList = this.generateCommandList();

    return { bashScript, commandList };
  }
}
