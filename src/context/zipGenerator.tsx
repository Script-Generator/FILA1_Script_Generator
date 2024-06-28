import React, { useState } from 'react';
import JSZip from 'jszip';
import { Button } from '@/components/ui/button';
import { TreeStructureEnum } from '@/utils/TreeStructureEnum.ts';
import { useFormContext } from '@/context/formContext.tsx';

interface ZipGeneratorComponentProps {
  codeEditorValue: string;
  javaCommandValue: string;
}

const ZipGeneratorComponent: React.FC<ZipGeneratorComponentProps> = ({ codeEditorValue, javaCommandValue }) => {
  const { formObject, isFormValid } = useFormContext();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleDownloadClick = async () => {
    const zip = new JSZip();

    const instancesFolder = zip.folder(TreeStructureEnum.INSTANCES);

    if (instancesFolder && formObject.population.file) {
      const populationFile = formObject.population.file;
      const arrayBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result;
          if (result) {
            resolve(result as ArrayBuffer);
          } else {
            reject(new Error('Failed to read file.'));
          }
        };
        reader.onerror = () => reject(new Error('Failed to read file.'));
        reader.readAsArrayBuffer(populationFile);
      });

      const inputZip = await JSZip.loadAsync(arrayBuffer);
      const filePromises = Object.keys(inputZip.files).map((filename) => {
        return inputZip.files[filename].async('blob').then((fileData) => {
          const cleanFilename = filename.split('/').pop();
          if (cleanFilename) {
            instancesFolder.file(cleanFilename, fileData);
          }
        });
      });

      await Promise.all(filePromises);
    }

    const jarFolder = zip.folder(TreeStructureEnum.JAR);
    if (jarFolder) {
      formObject.jar.forEach((jar) => {
        if (jar.file) {
          jarFolder.file(jar.file.name, jar.file);
        }
      });
    }

    zip.folder(TreeStructureEnum.LOGS);
    zip.file('commandLines.txt', javaCommandValue);
    zip.file('script.sh', codeEditorValue);
    zip.generateAsync({ type: 'blob' }).then((content) => {
      const a = document.createElement('a');
      const url = URL.createObjectURL(content);
      a.href = url;
      a.download = 'script.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  };

  const handleUpload = async () => {
    if (!isFormValid) {
      setErrorMessage('Some fields are invalid or empty. Please correct them before exporting.');
      return;
    } else {
      setErrorMessage(null);
    }
    const zip = new JSZip();

    const instancesFolder = zip.folder(TreeStructureEnum.INSTANCES);

    if (instancesFolder && formObject.population.file) {
      const populationFile = formObject.population.file;
      const arrayBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result;
          if (result) {
            resolve(result as ArrayBuffer);
          } else {
            reject(new Error('Failed to read file.'));
          }
        };
        reader.onerror = () => reject(new Error('Failed to read file.'));
        reader.readAsArrayBuffer(populationFile);
      });

      const inputZip = await JSZip.loadAsync(arrayBuffer);
      const filePromises = Object.keys(inputZip.files).map((filename) => {
        return inputZip.files[filename].async('blob').then((fileData) => {
          const cleanFilename = filename.split('/').pop();
          if (cleanFilename) {
            instancesFolder.file(cleanFilename, fileData);
          }
        });
      });

      await Promise.all(filePromises);
    }

    const jarFolder = zip.folder(TreeStructureEnum.JAR);
    if (jarFolder) {
      formObject.jar.forEach((jar) => {
        if (jar.file) {
          jarFolder.file(jar.file.name, jar.file);
        }
      });
    }

    zip.folder(TreeStructureEnum.LOGS);
    zip.file('commandLines.txt', javaCommandValue);
    zip.file('script.sh', codeEditorValue);

    const content = await zip.generateAsync({ type: 'blob' });

    const formData = new FormData();
    formData.append('file', content, 'script.zip');

    try {
      const response = await fetch('http://localhost:5001/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi du fichier");
      }

      const data = await response.json();
      console.log('Fichier envoyé avec succès :', data);
    } catch (error) {
      console.error("Erreur lors de l'envoi du fichier :", error);
    }
  };

  return (
    <div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <div className="flex mt-4 p-8 gap-4 justify-end">
        <Button onClick={handleUpload}>Upload</Button>
        <Button onClick={handleDownloadClick}>Download</Button>
      </div>
    </div>
  );
};

export default ZipGeneratorComponent;
