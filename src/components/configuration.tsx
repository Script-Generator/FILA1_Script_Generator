import React, { useEffect, useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FormObject } from "@/context/formObject";
import { useFormContext } from "@/context/formContext";
import { Button } from "@/components/ui/button";

interface ConfigurationItem {
    id: number;
    name: string;
    formObject: FormObject;
}

const Configuration: React.FC = () => {
    const { formObject, setFormObject } = useFormContext();
    const [configurations, setConfigurations] = useState<ConfigurationItem[]>([]);
    const [newConfName, setNewConfName] = useState('');

    useEffect(() => {
        const storedConfigs = localStorage.getItem('configurations');
        if (storedConfigs) {
            setConfigurations(JSON.parse(storedConfigs));
        }
    }, []);

    const saveConfigurations = (newConfigurations: ConfigurationItem[]) => {
        setConfigurations(newConfigurations);
        localStorage.setItem('configurations', JSON.stringify(newConfigurations));
    };

    const handleSelectChange = (name: string) => {
        const selectedConf = configurations.find(conf => conf.name === name);
        if (selectedConf) {
            setFormObject(selectedConf.formObject);
        }
    };

    const handleSaveConf = () => {
        const newConfiguration = { id: Date.now(), name: newConfName, formObject };
        const newConfigurations = [...configurations, newConfiguration];
        saveConfigurations(newConfigurations);
        setNewConfName('');
    };

    return (
        <div className="flex flex-col text-start gap-6">
            <div>
                <h2 className="text-xl font-bold">Save Configuration</h2>
                <p>Choose save configuration</p>
            </div>
            <div className="flex gap-4 items-center">
                <Select onValueChange={handleSelectChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Default" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Default</SelectLabel>
                            {configurations.map((conf) => (
                                <SelectItem key={conf.id} value={conf.name}>{conf.name}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <div className="flex flex-col gap-2">
                    <Input
                        type="text"
                        placeholder="Configuration Name"
                        value={newConfName}
                        onChange={(e) => setNewConfName(e.target.value)}
                    />
                </div>
                <Button onClick={handleSaveConf} disabled={!newConfName}>Save</Button>
            </div>
        </div>
    );
};

export default Configuration;
