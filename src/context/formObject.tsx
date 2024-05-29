export interface FormObject {
    jar: Jar[]
    serverPath : string;
    population : Population;
    logDir : string;
    args : string;
    sbatch : Sbatch[];
}

export interface Jar {
    name: string;
    file: File| null;
    jvmArgs: string;
}

export interface Population {
    name: string;
    file: File | null;
    params: string | number ;
}

export interface Sbatch {
    key: string;
    value: string;
}