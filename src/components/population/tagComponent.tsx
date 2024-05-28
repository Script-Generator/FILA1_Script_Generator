import React from 'react';

interface TagProps {
    file: File;
    onRemove: (file: File) => void;
}

const TagComponent: React.FC<TagProps> = ({ file, onRemove }) => {
    return (
        <span className="inline-flex items-center bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
            {file.name}
            <button
                onClick={() => onRemove(file)}
                className="ml-2 text-red-500 hover:text-red-700 focus:outline-none">
                &times;
            </button>
        </span>
    );
};

export default TagComponent;
