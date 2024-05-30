import React from 'react';
import { Input } from '@/components/ui/input.tsx';
import { useFormContext } from '@/context/formContext.tsx';

const JvmArgs = () => {
  const { formObject, setFormObject } = useFormContext();

  const handleJvmArgsInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormObject((prev) => ({ ...prev, jvmArgs: event.target.value }));
  };

  return (
    <div className="flex flex-col text-start gap-6">
      <div>
        <h2 className="text-xl font-bold">JVMArgs</h2>
        <p>Enter the args options</p>
      </div>
      <div>
        <Input
          type="text"
          placeholder="-XX:+UseSerialGC -server -Xmx8G -Xss128M"
          value={formObject.jvmArgs}
          onChange={handleJvmArgsInputChange}
        />
      </div>
    </div>
  );
};

export default JvmArgs;
