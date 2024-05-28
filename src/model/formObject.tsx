export interface FormObject {
    jar: Jar[]
    ServerPath : string;
    population : Population;
    logDir : string;
    args : string;
    sbatch : Sbatch;
}

export interface Jar {
    name: string;
    config: string;
}

export interface Population {
    file: string[];
}

export interface Sbatch {
    params: string[];
}