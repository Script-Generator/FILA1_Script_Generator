import React from 'react';
import { Input } from '@/components/ui/input.tsx';
import { useFormContext } from '@/context/formContext.tsx';

const Args = () => {
    const { formObject, setFormObject } = useFormContext();

    const handleArgsInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormObject((prev) => ({ ...prev, args: event.target.value }));
    };

    return (
        <div className="flex flex-col text-start gap-6">
            <div>
                <h2 className="text-xl font-bold">Args</h2>
                <p>Enter the args options</p>
            </div>
            <div>
                <Input
                    type="text"
                    placeholder="-lvl RESANA -limit (20m) -f -lc 1 -restarts [LUBY,500,5000] -valh MIN"
                    value={formObject.args}
                    onChange={handleArgsInputChange}
                />
            </div>
        </div>
    );
};

export default Args;