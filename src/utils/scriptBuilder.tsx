import { FormObject, Sbatch } from '@/context/formObject';

export class ScriptBuilder {
  private formData: FormObject;

  constructor(formData: FormObject) {
    this.formData = formData;
  }

  private isNotEmpty(value: unknown): boolean {
    if (value === null || value === undefined || value === '') {
      return false;
    }
    if (Array.isArray(value)) {
      if (value.length === 1) {
        if (
          typeof value[0] === 'object' &&
          value[0] !== null &&
          'key' in value[0] &&
          (value[0] as { key: string }).key === ''
        ) {
          return false;
        }
      }
    }
    return true;
  }

  private spacer(): string {
    return '';
  }

  private writeHeaders(): string {
    return '#!/bin/bash';
  }

  private writeSBatchOptions(): string {
    if (this.isNotEmpty(this.formData.sbatch)) {
      return this.formData.sbatch.map((option: Sbatch) => `#SBATCH --${option.key}=${option.value}`).join('\n');
    }
    return '# No SBATCH options for now';
  }

  private writePurge(): string {
    return 'module purge';
  }

  private writeFiles(): string {
    let suffix = '...';
    if (this.isNotEmpty(this.formData.serverPath) && this.isNotEmpty(this.formData.population)) {
      suffix = 'todo/*';
    }
    return 'FILES=' + suffix;
  }

  private writeJVMArgs(): string {
    let suffix = '...';
    if (this.isNotEmpty('')) {
      suffix = 'todo';
    }
    return 'JVMARGS=' + suffix;
  }

  private writeLogs(): string {
    let suffix = '...';
    if (this.isNotEmpty(this.formData.serverPath) && this.isNotEmpty(this.formData.population)) {
      suffix = 'todo';
    }
    return 'LOGDIR=' + suffix;
  }

  private writeSRunArgs(): string {
    let suffix = '...';
    //if (this.isNotEmpty(){
    //   suffix = '';
    // }
    return 'ARGS=' + suffix;
  }

  private writeOptions(): string {
    let suffix = '...';
    //if (this.isNotEmpty(){
    //   suffix = '';
    // }
    return 'declare -A OPTIONS=' + suffix;
  }

  private writeLoops(): string {
    let loop = 'for file in $FILES\ndo\n';
    //if custom

    loop += '';

    return loop + 'done';
  }

  private writeWait(): string {
    return 'wait';
  }

  private writeZip(): string {
    return 'zip ...';
  }

  public export(): string {
    const scriptParts: string[] = [
      this.writeHeaders(),
      this.spacer(),
      this.writeSBatchOptions(),
      this.spacer(),
      this.writePurge(),
      this.spacer(),
      this.writeFiles(),
      this.writeJVMArgs(),
      this.writeLogs(),
      this.writeSRunArgs(),
      this.writeOptions(),
      this.spacer(),
      this.writeLoops(),
      this.spacer(),
      this.writeWait(),
      this.writeZip(),
    ];

    return scriptParts.join('\n');
  }
}
