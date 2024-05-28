import React from 'react';

interface TagProps {
    file: File;
    onRemove: (file: File) => void;
}

const TagComponent: React.FC<TagProps> = ({ file, onRemove }) => {
    return (
        <span className="tag">
            {file.name}
            <button onClick={() => onRemove(file)} className="remove-button">
        &times;
    </button>
    </span>
);
};

export default TagComponent;