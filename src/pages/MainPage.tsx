import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import CodeEditor from '@/components/CodeEditor.tsx';
import FormParams from '@/components/FormParams.tsx';
import Header from '@/layout/header.tsx';

const MainPage = () => {
  return (
    <div className="h-screen flex flex-col ">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="flex-1 flex overflow-hidden ">
          <ResizablePanel defaultSize={55} className="flex flex-1 min-w-96">
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
