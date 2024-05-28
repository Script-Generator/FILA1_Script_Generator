export interface FormObject {
    jar: Jar[]
    serverPath : string;
    population : Population;
    logDir : string;
    args : string;
    sbatch : Sbatch[];
}

export interface Jar {
    file: File| null;
    jvmArgs: string;
}

export interface Population {
    file: string[];
}

export interface Sbatch {
    key: string;
    value: string;
}