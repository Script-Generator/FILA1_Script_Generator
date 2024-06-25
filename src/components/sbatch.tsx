import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { useFormContext } from '@/context/formContext';
import { useTheme } from "@/components/theme-provider";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select.tsx';
import { RegexEnum } from '@/utils/regexEnum.ts';

const regex: RegExp = new RegExp(RegexEnum.ALPHANUMERIC);

const Sbatch = () => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const { formObject, setFormObject, setFormValid, isFormValid } = useFormContext();
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (index: number, key: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const newSbatch = [...formObject.sbatch];
        newSbatch[index] = { ...newSbatch[index], [key]: event.target.value };
        if (regex.test(newSbatch[index].value) && isFormValid) {
            setError(null);
            setFormValid(true);
        } else {
            setError('Invalid value format (required: alphanumeric)');
            let valid = true;
            for (let i = 0; i < newSbatch.length; i++) {
                if (!regex.test(newSbatch[i].value)) {
                    valid = false;
                    break;
                }
            }
            if (valid) {
                setError(null);
            }
            setFormValid(valid);
        }
        setFormObject((prev) => ({ ...prev, sbatch: newSbatch }));
    };

    const handleSelectChange = (index: number, selectedValue: string) => {
        const newSbatch = [...formObject.sbatch];
        newSbatch[index] = { ...newSbatch[index], key: selectedValue };
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

    const sbatchOptions = [
        'job-name',
        'output',
        'error',
        'time',
        'partition',
        'mem',
        'ntasks',
        'nodes',
        'ntasks-per-node',
        'cpus-per-task',
        'gres',
        'reservation',
        'begin',
        'dependency',
        'mail-type',
        'mail-user',
        'chdir',
        'export',
        'no-requeue',
        'quiet',
        'verbose'
    ];

    return (
      <div className="flex flex-col text-start gap-6">
          <div>
              <h2 className="text-xl font-bold">Batch Options</h2>
              <p>Enter batch options</p>
          </div>
          {formObject.sbatch.map((item, index) => (
            <div key={index} className="flex gap-2">
                <Select onValueChange={(selectedValue) => handleSelectChange(index, selectedValue)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a command" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {sbatchOptions.map((option, idx) => (
                              <SelectItem
                                key={idx}
                                value={option}
                              >
                                  {option}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Input
                  type="text"
                  placeholder="Value"
                  value={item.value}
                  onChange={handleInputChange(index, 'value')}
                  className={error && !regex.test(item.value)? 'border-red-500' : ''}
                />
                {renderRemoveButton(index)}
            </div>
          ))}
          {error && <p className="text-red-500 mt-0 ml-1">{error}</p>}
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
