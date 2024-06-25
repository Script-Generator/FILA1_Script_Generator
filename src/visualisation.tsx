import { Label } from '@/components/ui/label';
import DropZoneComponent from '@/components/population/dropzoneComponent';
import { FileFormatEnum } from '@/utils/fileFormatEnum';
import { useState } from 'react';
import TagComponent from '@/components/population/tagComponent';

const Visualisation = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileUpload = (uploadedFile: File) => {
    setFiles([...files, uploadedFile]);
  };

  const handleRemoveFile = (fileIndex: number) => {
    setFiles(files.filter((_, index) => index !== fileIndex));
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-bold mb-4">Visualisation Result</h1>
      <Label className="mb-2">Select a file to visualise result</Label>
      {files.map((file, fileIndex) => (
        <div className="flex gap-6 mb-2 items-center" key={fileIndex}>
          <div className="flex items-center">
            <Label>
              <span className="ml-3">
                <TagComponent file={file} onRemove={() => handleRemoveFile(fileIndex)} icon="📄" />
              </span>
            </Label>
          </div>
        </div>
      ))}
      <div className="w-full max-w-md">
        <DropZoneComponent
          onFileUpload={handleFileUpload}
          allowedExtension={FileFormatEnum.JSON}
          onNameUpdate={(name: string) => console.log("Name updated: ", name)}
        />
      </div>
    </div>
  );
};

export default Visualisation;
