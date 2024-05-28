import React, { useCallback } from 'react';
import { useDropzone, DropzoneRootProps, DropzoneInputProps } from 'react-dropzone';

interface DropZoneProps {
    onFileUpload: (file: File) => void;
}

const DropZoneComponent: React.FC<DropZoneProps> = ({ onFileUpload }) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        // Ensure only one file is accepted
        if (acceptedFiles.length === 1 && acceptedFiles[0].name.endsWith('.zip')) {
            onFileUpload(acceptedFiles[0]);
        }
    }, [onFileUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false
    });

    return (
        <div
            {...getRootProps() as DropzoneRootProps}
            className={`border-2 border-dashed p-4 rounded-md ${isDragActive ? 'border-blue-500' : 'border-gray-300'}`}
        >
            <input {...getInputProps() as DropzoneInputProps} />
            {
                isDragActive ?
                    <p className="text-center">Drop the .zip file here...</p> :
                    <p className="text-center">Drag 'n' drop a .zip file here, or click to select a .zip file</p>
            }
        </div>
    );
};

export default DropZoneComponent;
