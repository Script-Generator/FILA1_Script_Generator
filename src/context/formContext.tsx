import React, { createContext, useContext, useState, ReactNode } from 'react';
import {FormObject} from "@/context/formObject.tsx";

interface FormContextProps {
    formObject: FormObject;
    setFormObject: React.Dispatch<React.SetStateAction<FormObject>>;
}

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const useFormContext = () => {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error('useFormContext must be used within a FormProvider');
    }
    return context;
};

export const FormProvider = ({ children }: { children: ReactNode }) => {
    const [formObject, setFormObject] = useState<FormObject>({
        jar: [{ name: '',file: null, jvmArgs: '' }],
        serverPath: '',
        population: { name: '', file: null, params: null },
        logDir: '',
        args: '',
        sbatch: [{ key: '', value: '' }],
    });

    return (
        <FormContext.Provider value={{ formObject, setFormObject }}>
            {children}
        </FormContext.Provider>
    );
};
