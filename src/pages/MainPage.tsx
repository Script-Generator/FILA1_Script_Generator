import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import CodeEditor from "@/components/CodeEditor.tsx";
import FormParams from "@/components/FormParams.tsx";
import Header from "@/layout/header.tsx";

const MainPage = () => {
  return (
    <div className="h-screen flex flex-col ">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <ResizablePanelGroup
          direction="horizontal"
          className="flex-1 flex overflow-hidden">
          <ResizablePanel className="flex-1 flex">
            <FormParams />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel className="flex-1 flex">
            <CodeEditor />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default MainPage;
