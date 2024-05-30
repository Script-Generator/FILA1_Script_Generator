import React from 'react';
import {Input} from '@/components/ui/input.tsx';
import {Label} from '@/components/ui/label.tsx';
import {useFormContext} from '@/context/formContext.tsx';

const LogOptions = () => {
  const { formObject, setFormObject } = useFormContext();

  const handleLogOptionsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLogOptions = event.target.value;
    setFormObject((prev) => {
      return {...prev, logOptions: newLogOptions};
    });
  };

  return (
    <div className="flex flex-col text-start gap-6">
      <div>
        <h2 className="text-xl font-bold">Log Options</h2>
        <Label htmlFor="serverPath">Choose way to construct your log folder</Label>
      </div>
      <Input id="serverPath" type="text" placeholder="/home/cprudhom/"
             value={formObject.logOptions}
             onChange={handleLogOptionsChange}/>
    </div>
  );
};

export default LogOptions;
