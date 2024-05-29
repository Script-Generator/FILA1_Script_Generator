import React from 'react';

interface TagProps {
    file: File;
    onRemove: (file: File) => void;
    icon?: string;
}

const TagComponent: React.FC<TagProps> = ({ file, onRemove, icon}) => {
    return (
        <span className="inline-flex items-center bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
            <span className="icon-file mr-2">{icon} {file.name}</span>
            <button
                onClick={() => onRemove(file)}
                className="ml-2 text-red-500 hover:text-red-700 focus:outline-none">
                &times;
            </button>
        </span>
    );
};

export default TagComponent;