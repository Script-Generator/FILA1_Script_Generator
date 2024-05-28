import { FormObject } from '@/context/formObject';

export class ScriptParser {
  private formData: FormObject;

  constructor(formData: FormObject) {
    this.formData = formData;
  }

  private spacer(): string {
    return '\n';
  }

  private writeHeaders(): string {
    return '#!/bin/bash\n';
  }

  private writeSBatchOptions(): string {
    let result: string = '';
    this.formData.sbatch.forEach((option) => {
      result += `#SBATCH --${option.key}=${option.value}\n`;
    });
    return result;
  }

  private writePurge(): string {
    return 'module purge\n';
  }

  private writeFiles(): string {
    return 'FILES=\n';
  }

  private writeJVMArgs(): string {
    return 'JVMARGS=\n';
  }

  private writeLogs(): string {
    return 'LOGDIR=\n';
  }

  private writeSRunArgs(): string {
    return 'ARGS=\n';
  }

  private writeLoops(): string {
    //foreach jarfile faire un boulis sur files etc
    return 'for ...\ndone\n';
  }

  private writeWait() {
    return 'wait\n';
  }

  private writeZip(): string {
    return 'zip ...';
  }

  public export(): string {
    return (
      this.writeHeaders() +
      this.spacer() +
      this.writeSBatchOptions() +
      this.spacer() +
      this.writePurge() +
      this.spacer() +
      this.writeJVMArgs() +
      this.writeFiles() +
      this.writeLogs() +
      this.writeSRunArgs() +
      this.spacer() +
      this.writeLoops() +
      this.spacer() +
      this.writeWait() +
      this.writeZip()
    );
  }
}
