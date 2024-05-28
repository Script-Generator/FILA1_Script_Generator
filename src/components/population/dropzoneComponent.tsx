// DropZone.tsx
import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';

interface DropZoneProps {
    onFileUpload: (files: File[]) => void;
}

const DropZoneComponent: React.FC<DropZoneProps> = ({onFileUpload}) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        onFileUpload(acceptedFiles);
    }, [onFileUpload]);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

    return (
        <div
            {...getRootProps()}
            className={`border-2 border-dashed p-4 rounded-md ${isDragActive ? 'border-blue-500' : 'border-gray-300'}`}
        >
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p className="text-center">Drop the files here...</p> :
                    <p className="text-center">Drag 'n' drop some files here, or click to select files</p>
            }
        </div>
    );
};

export default DropZoneComponent;
