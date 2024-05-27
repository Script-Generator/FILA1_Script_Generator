import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import {Separator} from "@/components/ui/separator.tsx";
import CodeEditor from "@/components/CodeEditor.tsx";

const MainPage = () => {
    return (
        <ResizablePanelGroup direction="horizontal">
            <ResizablePanel>
                <header>
                    <h1>Script Generator</h1>
                </header>
                <Separator/>

            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel>
                <CodeEditor/>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}

export default MainPage;
