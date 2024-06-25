import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import DropZoneComponent from '@/components/population/dropzoneComponent.tsx';
import { useFormContext } from '@/context/formContext.tsx';
import TagComponent from '@/components/population/tagComponent.tsx';
import { FileFormatEnum } from '@/utils/fileFormatEnum.ts';
import { RegexEnum } from '@/utils/regexEnum.ts';

const regexInt: RegExp = new RegExp(RegexEnum.INTEGER);
const regexAlphanum: RegExp = new RegExp(RegexEnum.ALPHANUMERIC);

const Population = () => {
  const { formObject, setFormObject, setFormValid } = useFormContext();
  const [errorInt, setErrorInt] = useState<string | null>(null);
  const [errorGrep, setErrorGrep] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  const handleParamsInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    const parsedValue = parseInt(newValue, 10);

    if (regexInt.test(newValue)) {
      setErrorInt(null);
      setFormValid(true);
    } else {
      setErrorInt('Invalid value format (required: integer)');
      setFormValid(false);
    }
    setFormObject((prev) => ({
      ...prev,
      population: {
        ...prev.population,
        params: isNaN(parsedValue) ? newValue : parsedValue,
      },
    }));
  };

  const handleGrepFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (regexAlphanum.test(newValue)) {
      setErrorGrep(null);
      setFormValid(true);
    } else {
      setErrorGrep('Invalid value format (required: alphanumeric)');
      setFormValid(false);
    }
    setFormObject((prev) => ({ ...prev, population: { ...prev.population, grepFilter: newValue } }));
  };

  const handleFileUpload = (uploadedFile: File) => {
    setFiles([uploadedFile]);
    setFormObject((prev) => ({ ...prev, population: { ...prev.population, file: uploadedFile } }));
  };

  const handleNameUpdate = (name: string) => {
    setFormObject((prev) => ({ ...prev, population: { ...prev.population, name: name } }));
  };

  const handleRemoveFile = () => {
    setFiles([]);
  };

  return (
    <>
      <h1 className="text-xl font-bold text-start">Tested Population</h1>

      {/* Label when nothing is selected  */}
      {files.length === 0 && (
        <div>
          <Label>Select a file to be used for testing.</Label>
          <DropZoneComponent
            onFileUpload={handleFileUpload}
            allowedExtension={FileFormatEnum.ZIP}
            onNameUpdate={handleNameUpdate}
          />
        </div>
      )}
      {/* Label when something is selected  */}
      {files.length > 0 && (
        <Label>
          Selected file :
          <span className="ml-3">
            <TagComponent file={files[0]} onRemove={handleRemoveFile} />
          </span>
        </Label>
      )}

      <Tabs defaultValue="all" className="flex-col">
        <TabsList className="flex w-full">
          <TabsTrigger value="all" className="flex">
            All
          </TabsTrigger>
          <TabsTrigger value="random" className="flex">
            Random
          </TabsTrigger>
          <TabsTrigger value="custom" className="flex">
            Custom
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Card className="w-full">
            <CardHeader>
              <Label>All files in the directory will be used for testing.</Label>
            </CardHeader>
          </Card>
        </TabsContent>
        <TabsContent value="random">
          <Card className="w-full">
            <CardHeader>
              <Label>Random files in the directory will be used for testing.</Label>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <CardDescription>Choose the number of random files</CardDescription>
                <Input
                  value={formObject.population.params}
                  onChange={handleParamsInputChange}
                  className={errorInt ? 'border-red-500' : ''}
                  id="numberFile" />
                {errorInt && <p className="text-red-500 mt-1">{errorInt}</p>}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="custom">
          <Card className="w-full">
            <CardHeader>
              <Label>Filter files in the directory to be used for testing.</Label>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <CardDescription>Specify custom criteria for file selection.</CardDescription>
                <Input value={formObject.population.params} onChange={handleParamsInputChange} id="customCriteria" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div>
        {' '}
        <p>Grep Filter for files</p>
        <Input
          type="text"
          placeholder="string that will be check in each file"
          value={formObject.population.grepFilter}
          onChange={handleGrepFilter}
          className={errorGrep ? 'border-red-500 mt-2' : 'mt-2'}
        />
        {errorGrep && <p className="text-red-500 mt-1">{errorGrep}</p>}
      </div>
    </>
  );
};

export default Population;
