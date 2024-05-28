import { Input } from '@/components/ui/input.tsx';
import React, { useState } from 'react';
import { Label } from '@/components/ui/label.tsx';
import { useTheme } from '@/components/theme-provider.tsx';

const Jar = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const [files, setFiles] = useState<{ file: File | null; jvmArgs: string }[]>([{ file: null, jvmArgs: '' }]);

  const handleFileChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newFiles = [...files];
      newFiles[index].file = event.target.files[0];
      setFiles(newFiles);
    }
  };

  const handleJvmArgsChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = [...files];
    newFiles[index].jvmArgs = event.target.value;
    setFiles(newFiles);
  };

  const addNewJarInput = () => {
    setFiles([...files, { file: null, jvmArgs: '' }]);
  };

  const removeJarInput = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  };

  return (
      <>
        <div className="flex flex-col text-start gap-6">
          <div>
            <h2 className="text-xl font-bold">JAR Options</h2>
            <p>.jar file upload or selection and arguments selection</p>
          </div>
          {files.map((fileObj, index) => (
              <div key={index} className="flex-col mb">
                <div className="flex gap-6 mb-2">
                  <input id={`fileUpload-${index}`} type="file" accept=".jar"
                      onChange={handleFileChange(index)}
                      style={{ display: 'none' }}/>
                  <button onClick={() => document.getElementById(`fileUpload-${index}`)?.click()}
                      className={`px-4 py-2 rounded ${
                          fileObj.file
                              ? isDarkMode
                                  ? 'bg-blackBleu text-white cursor-not-allowed'
                                  : 'bg-secondaryGray text-black cursor-not-allowed'
                              : isDarkMode
                                  ? 'bg-secondaryGray text-black'
                                  : 'bg-blackBleu text-white'}`}
                      disabled={!!fileObj.file}>
                    {fileObj.file ? 'Uploaded JAR' : 'Upload JAR'}
                  </button>
                  {fileObj.file && (
                      <div className="flex items-center">
                        <span className="icon-file mr-2">📄</span>
                        <span>{fileObj.file.name}</span>
                      </div>
                  )}
                  {index > 0 && (
                      <button onClick={() => removeJarInput(index)}
                          className={`px-4 py-2 rounded ${isDarkMode ? 'bg-red-600 text-white' : 'bg-red-600 text-white'}`}>
                        -
                      </button>
                  )}
                </div>
                <div>
                  <Label htmlFor={`jvmArgs-${index}`}>JVM Args</Label>
                  <Input id={`jvmArgs-${index}`} type="text"
                         placeholder="-XX:+UseSerialGC -server -Xmx8G -Xss128M"
                      value={fileObj.jvmArgs}
                      onChange={handleJvmArgsChange(index)}/>
                </div>
              </div>
          ))}
          <button onClick={addNewJarInput}
              className={`px-4 py-2 rounded ${isDarkMode ? 'bg-blackBleu text-white' : 'bg-secondaryGray text-black'}`}>
            +
          </button>
        </div>
      </>
  );
};

export default Jar;
