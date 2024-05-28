import './App.css';
import { ThemeProvider } from '@/components/theme-provider';
import Header from "@/layout/header.tsx";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable.tsx";
import FormParams from "@/components/formParams.tsx";
import CodeEditor from "@/components/codeEditor.tsx";

function App() {
  return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <div className="h-screen flex flex-col ">
              <Header/>
              <div className="flex flex-1 overflow-hidden">
                  <ResizablePanelGroup direction="horizontal" className="flex-1 flex">
                      <ResizablePanel defaultSize={55} className="flex flex-1 min-w-96 !overflow-scroll">
                          <FormParams/>
                      </ResizablePanel>
                      <ResizableHandle withHandle/>
                      <ResizablePanel defaultSize={45} className="flex flex-1 min-w-96">
                          <CodeEditor/>
                      </ResizablePanel>
                  </ResizablePanelGroup>
              </div>
          </div>
      </ThemeProvider>
  );
}

export default App;
