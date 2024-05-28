import React, {useState} from 'react';
import TagComponent from "@/components/population/tagComponent.tsx";
import DropZoneComponent from "@/components/population/dropzoneComponent.tsx";
import "./style.css";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

const ChoiceButton: React.FC = () => {
    const [files, setFiles] = useState<File[]>([]);

    const handleFileUpload = (uploadedFiles: File[]) => {
        setFiles(uploadedFiles);
    };

    const handleRemoveFile = (fileToRemove: File) => {
        setFiles(files.filter(file => file !== fileToRemove));
    };

    return (
        <>
            <h1 className="text-2xl font-bold text-start">Tested Population</h1>

            {/* Label when nothing is selected  */}
            {files.length === 0 && (
                <Label>
                    Select files to be used for testing.
                </Label>
            )}

            {/* Label when something is selected  */}
            {files.length > 0 && (
                <Label>
                    Selected files :
                    <span>
                        {files.map((file, index) => (
                            <TagComponent key={index} file={file} onRemove={handleRemoveFile}/>
                        ))}
                    </span>
                </Label>
            )}

            <DropZoneComponent onFileUpload={handleFileUpload}/>

            <Tabs defaultValue="all" className="flex-col">
                <TabsList className="flex w-full">
                    <TabsTrigger value="all" className="flex">All</TabsTrigger>
                    <TabsTrigger value="random" className="flex">Random</TabsTrigger>
                    <TabsTrigger value="custom" className="flex">Custom</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                    <Card className="w-full">
                        <CardHeader>
                            <Label>All files in the directory will be used for testing.</Label>
                        </CardHeader>
                    </Card>
                </TabsContent>
                <TabsContent value="random">
                    <Card className="w-full">
                        <CardHeader>
                            <Label>Random files in the directory will be used for testing.</Label>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <CardDescription>Choose the number of random files</CardDescription>
                                <Input id="numberFile"/>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="custom">
                    <Card className="w-full">
                        <CardHeader>
                            <Label>Filter files in the directory to be used for testing.</Label>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <CardDescription>Specify custom criteria for file selection.</CardDescription>
                                <Input id="customCriteria"/>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </>
    );
};

export default ChoiceButton;
