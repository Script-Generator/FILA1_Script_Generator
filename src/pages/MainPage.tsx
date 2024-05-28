import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import CodeEditor from '@/components/codeEditor.tsx';
import FormParams from '@/components/formParams.tsx';
import Header from '@/layout/header.tsx';

const MainPage = () => {
  return (
    <div className="h-screen flex flex-col ">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="flex-1 flex">
          <ResizablePanel defaultSize={55} className="flex flex-1 min-w-96 !overflow-scroll">
            <FormParams />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={45} className="flex flex-1 min-w-96">
            <CodeEditor />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default MainPage;
