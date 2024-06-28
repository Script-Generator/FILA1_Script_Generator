export interface FormObject {
  serverPath: string;
  sbatch: Sbatch[];
  population: Population;
  jvmArgs: string;
  jar: Jar[];
  logOptions: boolean;
}

export interface Jar {
  name: string;
  file: File | null;
  defaultArgs: string;
  multiValueArgs: Array<{ paramName: string; values: string[] }>;
}

export interface Population {
  name: string;
  file: File | null;
  params: string | number;
  grepFilter: string;
}

export interface Sbatch {
  key: string;
  value: string;
}
