import React, {useState} from 'react';
import {useTheme} from '@/components/theme-provider';
import {useFormContext} from '@/context/formContext';
import DropZoneComponent from "@/components/population/dropzoneComponent";
import TagComponent from "@/components/population/tagComponent";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Card} from "@/components/ui/card.tsx";

const Jar = () => {
    const {theme} = useTheme();
    theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    useFormContext();

    const [files, setFiles] = useState<{ file: File, jvmArgs: string }[]>([]);

    const handleFileUpload = (uploadedFile: File) => {
        setFiles((prevFiles) => [...prevFiles, {file: uploadedFile, jvmArgs: ''}]);
    };

    const handleRemoveFile = (index: number) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const handleJvmArgsChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFiles((prevFiles) => {
            const newFiles = [...prevFiles];
            newFiles[index].jvmArgs = event.target.value;
            return newFiles;
        });
    };

    return (
        <div className="flex flex-col text-start gap-6">
            <div>
                <h2 className="text-xl font-bold">JAR Options</h2>
                <p>.jar file upload or selection and arguments selection</p>
            </div>
            {files.map((fileObj, index) => (
                <Card className={'p-4'}>
                    <div key={index} className="flex-col mb-6">
                        <div className="flex gap-6 mb-2 items-center">
                            <div className="flex items-center">
                                <Label>
                                    Selected file :
                                    <span className="ml-3">
                                    <TagComponent file={fileObj.file} onRemove={() => handleRemoveFile(index)}
                                                  icon="📄"/>
                                </span>
                                </Label>
                            </div>
                        </div>
                        <div>
                            <Label htmlFor={`jvmArgs-${index}`}>JVM Args</Label>
                            <Input
                                id={`jvmArgs-${index}`}
                                type="text"
                                placeholder="-XX:+UseSerialGC -server -Xmx8G -Xss128M"
                                value={fileObj.jvmArgs}
                                onChange={handleJvmArgsChange(index)}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                    </div>
                </Card>
            ))}
            <DropZoneComponent onFileUpload={handleFileUpload} allowedExtension=".jar"/>
        </div>
    );
};

export default Jar;
