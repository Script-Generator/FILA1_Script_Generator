import React from 'react';
import JSZip from 'jszip';
import { Button } from '@/components/ui/button';
import {TreeStructureEnum} from "@/utils/TreeStructureEnum.ts";

interface ZipGeneratorComponentProps {
    codeEditorValue: string;
}

const ZipGeneratorComponent: React.FC<ZipGeneratorComponentProps> = ({ codeEditorValue }) => {

    const handleDownloadClick = () => {
        const zip = new JSZip();

        for (const key in TreeStructureEnum) {
            if (Object.prototype.hasOwnProperty.call(TreeStructureEnum, key)) {
                const folderName = TreeStructureEnum[key as keyof typeof TreeStructureEnum];
                zip.folder(folderName);
            }
        }

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
        <div className="mt-4 p-8 absolute bottom-0 right-0">
            <Button onClick={handleDownloadClick}>Export</Button>
        </div>
    );
};

export default ZipGeneratorComponent;
