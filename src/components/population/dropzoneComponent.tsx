import React, { useCallback } from 'react';
import { useDropzone, DropzoneRootProps, DropzoneInputProps } from 'react-dropzone';

interface DropZoneProps {
    onFileUpload: (file: File) => void;
    allowedExtension: string;
    onNameUpdate: (name: string) => void;
}

const DropZoneComponent: React.FC<DropZoneProps> = ({ onFileUpload, allowedExtension, onNameUpdate }) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length === 1 && acceptedFiles[0].name.endsWith(allowedExtension)) {
            onFileUpload(acceptedFiles[0]);
        }
    }, [onFileUpload, allowedExtension, onNameUpdate]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false
    });

    return (
        <div
            {...getRootProps() as DropzoneRootProps}
            className={`border-2 border-dashed p-4 rounded-md ${isDragActive ? 'border-blue-500' : 'border-gray-300'}`}>
            <input {...getInputProps() as DropzoneInputProps} />
            {
                isDragActive ?
                    <p className="text-center">Drop the {allowedExtension} file here...</p> :
                    <p className="text-center">Drag and drop a {allowedExtension} file here or click</p>
            }
        </div>
    );
};

export default DropZoneComponent;
