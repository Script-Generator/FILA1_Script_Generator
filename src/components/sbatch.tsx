import React, { useEffect } from "react";
import { Input } from '@/components/ui/input';
import { useFormContext } from '@/context/formContext';
import { useTheme } from "@/components/theme-provider";

const Sbatch = () => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const { formObject, setFormObject } = useFormContext();

    useEffect(() => {
        if (formObject.sbatch.length === 0) {
            setFormObject((prev) => ({
                ...prev,
                sbatch: [{ key: '', value: '' }],
            }));
        }
    }, []);

    const handleInputChange = (index: number, key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSbatch = [...formObject.sbatch];
        newSbatch[index] = { ...newSbatch[index], [key]: event.target.value };
        setFormObject((prev) => ({ ...prev, sbatch: newSbatch }));
    };

    const addNewSbatchInput = () => {
        setFormObject((prev) => ({
            ...prev,
            sbatch: [...prev.sbatch, { key: '', value: '' }],
        }));
    };

    const removeSbatchInput = (index: number) => {
        const newSbatch = formObject.sbatch.filter((_, i) => i !== index);
        setFormObject((prev) => ({ ...prev, sbatch: newSbatch }));
    };

    const renderRemoveButton = (index: number) => (
        <button
            onClick={() => removeSbatchInput(index)}
            className={`px-4 py-2 rounded ${index === 0 ? 'invisible' : (isDarkMode ? 'bg-red-600 text-white' : 'bg-red-600 text-white')}`}
            aria-label={index === 0 ? 'hidden' : undefined}
        >
            -
        </button>
    );

    return (
        <div className="flex flex-col text-start gap-6">
            <div>
                <h2 className="text-xl font-bold">Batch Options</h2>
                <p>Enter batch options</p>
            </div>
            {formObject.sbatch.map((item, index) => (
                <div key={index} className="flex gap-2">
                    <Input
                        type="text"
                        placeholder="Option"
                        value={item.key}
                        onChange={handleInputChange(index, 'key')}
                    />
                    <Input
                        type="text"
                        placeholder="Value"
                        value={item.value}
                        onChange={handleInputChange(index, 'value')}
                    />
                    {renderRemoveButton(index)}
                </div>
            ))}
            <button
                onClick={addNewSbatchInput}
                className={`px-4 py-2 rounded ${isDarkMode ? 'bg-blackBleu text-white' : 'bg-secondaryGray text-black'}`}
            >
                +
            </button>
        </div>
    );
};

export default Sbatch;
