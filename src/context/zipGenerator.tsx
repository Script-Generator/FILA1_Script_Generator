import React from 'react';
import JSZip from 'jszip';
<<<<<<< HEAD
import {Button} from '@/components/ui/button';
import {TreeStructureEnum} from "@/utils/TreeStructureEnum.ts";
import {useFormContext} from "@/context/formContext.tsx";
=======
import { Button } from '@/components/ui/button';
import {TreeStructureEnum} from "@/utils/TreeStructureEnum.ts";
>>>>>>> 08277ae (@dev:Ajout de l'export du script dans un zip)

interface ZipGeneratorComponentProps {
    codeEditorValue: string;
}

<<<<<<< HEAD
const {formObject} = useFormContext();
=======
>>>>>>> 08277ae (@dev:Ajout de l'export du script dans un zip)
const ZipGeneratorComponent: React.FC<ZipGeneratorComponentProps> = ({ codeEditorValue }) => {

    const handleDownloadClick = () => {
        const zip = new JSZip();

<<<<<<< HEAD
        const instancesFolder = zip.folder(TreeStructureEnum.INSTANCES);

        if (instancesFolder) {
            if (instancesFolder) {
                formObject.population.file && instancesFolder.file(formObject.population.file.name, formObject.population.file);
            }
        }

        const jarFolder = zip.folder(TreeStructureEnum.JAR);
        if (jarFolder) {
            formObject.jar.forEach((jar) => {
                if (jar.file) {
                    jarFolder.file(jar.file.name, jar.file);
                }
            });
        }

        const logsFolder = zip.folder(TreeStructureEnum.LOGS);
        if (logsFolder) {
            logsFolder.file(formObject.logOptions, formObject.logOptions);
        }

        zip.file('script.sh', codeEditorValue);
        zip.generateAsync({type: 'blob'}).then((content) => {
=======
        for (const key in TreeStructureEnum) {
            if (Object.prototype.hasOwnProperty.call(TreeStructureEnum, key)) {
                const folderName = TreeStructureEnum[key as keyof typeof TreeStructureEnum];
                zip.folder(folderName);
            }
        }

        zip.file('script.sh', codeEditorValue);
        zip.generateAsync({ type: 'blob' }).then((content) => {
>>>>>>> 08277ae (@dev:Ajout de l'export du script dans un zip)
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
