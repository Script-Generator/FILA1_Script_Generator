import React from 'react';
import JSZip from 'jszip';
import { Button } from '@/components/ui/button';
import { TreeStructureEnum } from '@/utils/TreeStructureEnum.ts';
import { useFormContext } from '@/context/formContext.tsx';

interface ZipGeneratorComponentProps {
  codeEditorValue: string;
  javaCommandValue: string;
}

const ZipGeneratorComponent: React.FC<ZipGeneratorComponentProps> = ({ codeEditorValue, javaCommandValue }) => {
  const { formObject } = useFormContext();

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

  return (
    <div className="mt-2 p-4 absolute bottom-0 right-0">
      <Button onClick={handleDownloadClick}>Export</Button>
    </div>
  );
};

export default ZipGeneratorComponent;
