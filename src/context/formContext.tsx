import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FormObject } from '@/context/formObject.tsx';

interface FormContextProps {
  formObject: FormObject;
  setFormObject: React.Dispatch<React.SetStateAction<FormObject>>;
  isFormValid: boolean;
  setFormValid: React.Dispatch<React.SetStateAction<boolean>>;
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
    serverPath: '',
    sbatch: [{ key: '', value: '' }],
    population: { name: '', file: null, params: '', grepFilter: '' },
    jvmArgs: '',
    jar: [{ name: '', file: null, defaultArgs: '', multiValueArgs: [] }],
    logOptions: '',
  });
  const [isFormValid, setFormValid] = useState<boolean>(true);

  return (
    <FormContext.Provider value={{ formObject, setFormObject, isFormValid, setFormValid }}>
      {children}
    </FormContext.Provider>
  );
};
