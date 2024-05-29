import React from 'react';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@/components/ui/label.tsx';
import { useFormContext } from '@/context/formContext.tsx';

const ServerPath = () => {
    const { formObject, setFormObject } = useFormContext();

    const handleServerPathChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPath = event.target.value;
        setFormObject((prev) => {
            const newObj = { ...prev, serverPath: newPath };
            console.log("Updated formObject:", newObj);
            return newObj;
        });
    };

    return (
        <div className="flex flex-col text-start gap-6">
            <div>
                <h2 className="text-xl font-bold">Path Server</h2>
                <Label htmlFor="serverPath">Enter the path where your server files are located</Label>
            </div>
            <Input id="serverPath" type="text" placeholder="/home/cprudhom/"
                value={formObject.serverPath}
                onChange={handleServerPathChange}/>
        </div>
    );
};

export default ServerPath;
