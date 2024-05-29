import React, { useState } from 'react';
import { useFormContext } from '@/context/formContext';
import DropZoneComponent from "@/components/population/dropzoneComponent";
import TagComponent from "@/components/population/tagComponent";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card.tsx";
import { FileFormatEnum } from "@/utils/fileFormatEnum";

const Jar = () => {
    const { formObject, setFormObject } = useFormContext();
    const [files, setFiles] = useState<{ name: string, file: File, jvmArgs: string }[]>([]);

    const handleNameUpdate = (index: number, name: string) => {
        const newFormObject = [...formObject.jar];
        newFormObject[index] = { ...newFormObject[index], name: name };
        setFormObject(prev => ({ ...prev, jar: newFormObject }));
        console.log(formObject)
    };

    const handleFileUpload = (index: number, uploadedFile: File) => {
        const newFiles = [...files];
        newFiles[index] = { name: uploadedFile.name, file: uploadedFile, jvmArgs: '' };
        setFiles(newFiles);

        const newFormObject = [...formObject.jar];
        newFormObject[index] = { name: uploadedFile.name, file: uploadedFile, jvmArgs: '' };
        setFormObject(prev => ({ ...prev, jar: newFormObject }));
        console.log(formObject)
    };

    const handleRemoveFile = (index: number) => {
        const newFiles = files.filter((_, i) => i !== index);
        setFiles(newFiles);

        const newFormObject = [...formObject.jar.slice(0, index), ...formObject.jar.slice(index + 1)];
        setFormObject(prev => ({ ...prev, jar: newFormObject }));
        console.log(formObject)
    };

    const handleJvmArgsChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFiles = [...files];
        newFiles[index].jvmArgs = event.target.value;
        setFiles(newFiles);

        const newFormObject = [...formObject.jar];
        newFormObject[index] = { ...newFormObject[index], jvmArgs: event.target.value };
        setFormObject(prev => ({ ...prev, jar: newFormObject }));
        console.log(formObject)
    };

    return (
        <div className="flex flex-col text-start gap-6">
            <div>
                <h2 className="text-xl font-bold">JAR Options</h2>
                <p>.jar file upload or selection and arguments selection</p>
            </div>
            {files.map((fileObj, index) => (
                <Card key={index} className="p-4">
                    <div className="flex-col mb-6">
                        <div className="flex gap-6 mb-2 items-center">
                            <div className="flex items-center">
                                <Label>
                                    Selected file :
                                    <span className="ml-3">
                                        <TagComponent file={fileObj.file} onRemove={() => handleRemoveFile(index)} icon="📄" />
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
            <DropZoneComponent
                onFileUpload={(uploadedFile: File) => handleFileUpload(files.length, uploadedFile)}
                allowedExtension={FileFormatEnum.JAR}
                onNameUpdate={(name: string) => handleNameUpdate(files.length - 1, name)}
            />
        </div>
    );
};

export default Jar;
