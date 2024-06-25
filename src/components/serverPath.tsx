import React, { useEffect, useState } from 'react';
import {Input} from '@/components/ui/input.tsx';
import {Label} from '@/components/ui/label.tsx';
import {useFormContext} from '@/context/formContext.tsx';
import {RegexEnum} from '@/utils/regexEnum.ts';

const regex: RegExp = new RegExp(RegexEnum.FILEPATH);


const ServerPath = () => {
    const { formObject, setFormObject, setFormValid } = useFormContext();
    const [error, setError] = useState<string | null>(null);

    const handleServerPathChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPath = event.target.value;
        if (regex.test(newPath)) {
            setError(null);
            setFormValid(true);
        } else {
            setError('Invalid path format (required: /path/to/server/folder/)');
            setFormValid(false);
        }
        setFormObject((prev) => {
            return { ...prev, serverPath: newPath };
        });
    };

    useEffect(() => {
        if (!regex.test(formObject.serverPath)) {
            setFormValid(false);
        }
    }, [formObject.serverPath, setFormValid]);

    return (
      <div className="flex flex-col text-start gap-6">
        <div>
          <h2 className="text-xl font-bold">Path Server</h2>
          <Label htmlFor="serverPath">Enter the path where your server files are located</Label>
        </div>
        <div>
            <Input
              id="serverPath"
              type="text"
              placeholder="/home/cprudhom/"
              value={formObject.serverPath}
              onChange={handleServerPathChange}
              className={error ? 'border-red-500' : ''}
            />
            {error && <p className="text-red-500 mt-1">{error}</p>}
        </div>
      </div>
    );
};

export default ServerPath;
