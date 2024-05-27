import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import CodeEditor from "@/components/CodeEditor.tsx";
import FormParams from "@/components/FormParams.tsx";
import Header from "@/layout/header.tsx";

const MainPage = () => {
    return (
        <>
            <Header/>
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel>
                    <FormParams/>
                </ResizablePanel>
                <ResizableHandle withHandle/>
                <ResizablePanel>
                    <CodeEditor/>
                </ResizablePanel>
            </ResizablePanelGroup>
        </>
    )
}

export default MainPage;
