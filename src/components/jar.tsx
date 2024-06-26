import React, { useState } from 'react';
import { useFormContext } from '@/context/formContext';
import DropZoneComponent from '@/components/population/dropzoneComponent';
import TagComponent from '@/components/population/tagComponent';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card.tsx';
import { Button } from '@/components/ui/button';
import { FileFormatEnum } from '@/utils/fileFormatEnum';
import { useTheme } from '@/components/theme-provider.tsx';

const Jar = () => {
  const { theme } = useTheme();
  const isDarkMode =
    theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const { formObject, setFormObject } = useFormContext();
  const [files, setFiles] = useState<
    {
      name: string;
      file: File | null;
      defaultArgs: string;
      multiValueArgs: Array<{ paramName: string; values: string[] }>;
    }[]
  >([]);

  const handleNameUpdate = (index: number, name: string) => {
    const newFormObject = [...formObject.jar];
    newFormObject[index] = { ...newFormObject[index], name: name };
    setFormObject((prev) => ({ ...prev, jar: newFormObject }));
  };

  const handleFileUpload = (index: number, uploadedFile: File) => {
    const newFiles = [...files];
    newFiles[index] = { name: uploadedFile.name, file: uploadedFile, defaultArgs: '', multiValueArgs: [] };
    setFiles(newFiles);

    const newFormObject = [...formObject.jar];
    newFormObject[index] = { name: uploadedFile.name, file: uploadedFile, defaultArgs: '', multiValueArgs: [] };
    setFormObject((prev) => ({ ...prev, jar: newFormObject }));
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);

    const newFormObject = [...formObject.jar.slice(0, index), ...formObject.jar.slice(index + 1)];
    setFormObject((prev) => ({ ...prev, jar: newFormObject }));
  };

  const handleArgsChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = [...files];
    newFiles[index].defaultArgs = event.target.value;
    setFiles(newFiles);

    const newFormObject = [...formObject.jar];
    newFormObject[index] = { ...newFormObject[index], defaultArgs: event.target.value };
    setFormObject((prev) => ({ ...prev, jar: newFormObject }));
  };

  const handleMultiArgsParamsChange =
    (fileIndex: number, paramIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newFiles = [...files];
      newFiles[fileIndex].multiValueArgs[paramIndex].paramName = event.target.value;
      setFiles(newFiles);

      const newFormObject = [...formObject.jar];
      newFormObject[fileIndex] = { ...newFormObject[fileIndex], multiValueArgs: newFiles[fileIndex].multiValueArgs };
      setFormObject((prev) => ({ ...prev, jar: newFormObject }));
    };

  const handleMultiArgsValueChange =
    (fileIndex: number, paramIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newFiles = [...files];
      newFiles[fileIndex].multiValueArgs[paramIndex].values = event.target.value.split(';');
      setFiles(newFiles);

      const newFormObject = [...formObject.jar];
      newFormObject[fileIndex] = { ...newFormObject[fileIndex], multiValueArgs: newFiles[fileIndex].multiValueArgs };
      setFormObject((prev) => ({ ...prev, jar: newFormObject }));
    };

  const addMultiArgs = (fileIndex: number) => {
    const newFiles = [...files];
    newFiles[fileIndex].multiValueArgs.push({ paramName: '', values: [] });
    setFiles(newFiles);

    const newFormObject = [...formObject.jar];
    newFormObject[fileIndex] = { ...newFormObject[fileIndex], multiValueArgs: newFiles[fileIndex].multiValueArgs };
    setFormObject((prev) => ({ ...prev, jar: newFormObject }));
  };

  const removeMultiArgs = (fileIndex: number, paramIndex: number) => {
    const newFiles = [...files];
    newFiles[fileIndex].multiValueArgs.splice(paramIndex, 1);
    setFiles(newFiles);

    const newFormObject = [...formObject.jar];
    newFormObject[fileIndex] = { ...newFormObject[fileIndex], multiValueArgs: newFiles[fileIndex].multiValueArgs };
    setFormObject((prev) => ({ ...prev, jar: newFormObject }));
  };

  return (
    <div className="flex flex-col text-start gap-6 mb-8">
      <div>
        <h2 className="text-xl font-bold">JAR Options</h2>
        <p>.jar file upload or selection and arguments selection</p>
      </div>
      {files.map((fileObj, fileIndex) => (
        <Card key={fileIndex} className="p-4">
          <div className="flex-col space-y-6">
            <div className="flex gap-6 mb-2 items-center">
              <div className="flex items-center">
                <Label>
                  Selected file :
                  <span className="ml-3">
                    <TagComponent file={fileObj.file} onRemove={() => handleRemoveFile(fileIndex)} icon="📄" />
                  </span>
                </Label>
              </div>
            </div>
            <div>
              <Label htmlFor={`args-${fileIndex}`}>Args</Label>
              <Input
                id={`args-${fileIndex}`}
                type="text"
                placeholder="-lvl RESANA -limit (20m) -f -lc 1 -restarts [LUBY,500,5000] -valh MIN"
                value={fileObj.defaultArgs}
                onChange={handleArgsChange(fileIndex)}
                className="w-full p-2 border rounded"
              />
            </div>
            {fileObj.multiValueArgs.map((multiArg, paramIndex) => (
              <div key={paramIndex} className="flex w-full gap-6 items-end">
                <div className="flex flex-col w-1/3 space-y-1">
                  <Label htmlFor={`multiArgsParam-${fileIndex}-${paramIndex}`}>Multi Args Params</Label>
                  <Input
                    id={`multiArgsParam-${fileIndex}-${paramIndex}`}
                    type="text"
                    placeholder="varh"
                    value={multiArg.paramName}
                    onChange={handleMultiArgsParamsChange(fileIndex, paramIndex)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="flex flex-col w-2/3 space-y-1">
                  <Label htmlFor={`multiArgsValue-${fileIndex}-${paramIndex}`}>Multi Args Value (Separator ;)</Label>
                  <Input
                    id={`multiArgsValue-${fileIndex}-${paramIndex}`}
                    type="text"
                    placeholder="DOMWDEG; FRBA"
                    value={multiArg.values.join(';')}
                    onChange={handleMultiArgsValueChange(fileIndex, paramIndex)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <Button
                  onClick={() => removeMultiArgs(fileIndex, paramIndex)}
                  className="px-4 py-2 rounded bg-red-600 text-white self-end"
                >
                  -
                </Button>
              </div>
            ))}
            <button
              onClick={() => addMultiArgs(fileIndex)}
              className={`w-full px-4 py-2 rounded ${isDarkMode ? 'bg-blackBleu text-white' : 'bg-secondaryGray text-black'}`}
            >
              +
            </button>
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
