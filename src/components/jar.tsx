import React from 'react';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@/components/ui/label.tsx';
import { useTheme } from '@/components/theme-provider.tsx';
import { useFormContext } from '@/context/formContext.tsx';

const Jar = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const { formObject, setFormObject } = useFormContext();

  const handleFileChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newFiles = [...formObject.jar];
      newFiles[index] = { ...newFiles[index], file: event.target.files[0] };
      setFormObject((prev) => {
        const newObj = { ...prev, jar: newFiles };
        console.log("objet", newObj);
        return newObj;
      });
    }
  };

  const handleJvmArgsChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = [...formObject.jar];
    newFiles[index] = { ...newFiles[index], jvmArgs: event.target.value };
    setFormObject((prev) => ({ ...prev, jar: newFiles }));
  };

  const addNewJarInput = () => {
    setFormObject((prev) => ({
      ...prev,
      jar: [...prev.jar, { file: null, jvmArgs: '' }],
    }));
  };

  const removeJarInput = (index: number) => {
    const newFiles = formObject.jar.filter((_, i) => i !== index);
    setFormObject((prev) => ({ ...prev, jar: newFiles }));
  };

  return (
      <div className="flex flex-col text-start gap-6">
        <div>
          <h2 className="text-xl font-bold">JAR Options</h2>
          <p>.jar file upload or selection and arguments selection</p>
        </div>
        {formObject.jar.map((fileObj, index) => (
            <div key={index} className="flex-col mb">
              <div className="flex gap-6 mb-2">
                <input id={`fileUpload-${index}`} type="file" accept=".jar" onChange={handleFileChange(index)} style={{ display: 'none' }} />
                <button onClick={() => document.getElementById(`fileUpload-${index}`)?.click()}
                    className={`px-4 py-2 rounded ${
                        fileObj.file
                            ? isDarkMode
                                ? 'bg-blackBleu text-white cursor-not-allowed'
                                : 'bg-secondaryGray text-black cursor-not-allowed'
                            : isDarkMode
                                ? 'bg-secondaryGray text-black'
                                : 'bg-blackBleu text-white'
                    }`}
                    disabled={!!fileObj.file}>
                  {fileObj.file ? 'Uploaded JAR' : 'Upload JAR'}
                </button>
                {fileObj.file && (
                    <div className="flex items-center">
                      <span className="icon-file mr-2">📄</span>
                      <span>{fileObj.file.name}</span>
                    </div>
                )}
                    <button onClick={() => removeJarInput(index)}
                        className={`px-4 py-2 rounded ${isDarkMode ? 'bg-red-600 text-white' : 'bg-red-600 text-white'}`}>
                      -
                    </button>
              </div>
              <div>
                <Label htmlFor={`jvmArgs-${index}`}>JVM Args</Label>
                <Input id={`jvmArgs-${index}`} type="text" placeholder="-XX:+UseSerialGC -server -Xmx8G -Xss128M"
                    value={fileObj.jvmArgs}
                    onChange={handleJvmArgsChange(index)}/>
              </div>
            </div>
        ))}
        <button onClick={addNewJarInput} className={`px-4 py-2 rounded ${isDarkMode 
            ? 'bg-blackBleu text-white' : 'bg-secondaryGray text-black'}`}>
          +
        </button>
      </div>
  );
};

export default Jar;
