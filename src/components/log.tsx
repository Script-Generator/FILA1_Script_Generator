import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { useFormContext } from '@/context/formContext.tsx';

const LogOption = () => {
  const { formObject, setFormObject } = useFormContext();

  const handleLogOptionChange = (checked: boolean) => {
    setFormObject((prev) => {
      return { ...prev, logOptions: checked };
    });
  };

  return (
    <div className="flex flex-col text-start gap-6 mb-8">
      <h2 className="text-xl font-bold">Log Options</h2>

      <div className="flex items-center space-x-2">
        <Checkbox id="terms" checked={formObject.logOptions} onCheckedChange={handleLogOptionChange} />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          While having this option enabled, the log will be created in a new file by bash redirection. (to use when no
          -log options are available in the java .jar file)
        </label>
      </div>
    </div>
  );
};

export default LogOption;
