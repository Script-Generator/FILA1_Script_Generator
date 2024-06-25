import './App.css';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/layout/header';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import FormParams from '@/components/formParams';
import CodeEditor from '@/components/codeEditor';
import { FormProvider } from './context/formContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Visualisation from './visualisation.tsx';

function Home() {
  return (
    <FormProvider>
      <div className="flex flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="flex-1 flex overflow-hidden">
          <ResizablePanel defaultSize={55} className="flex flex-1 min-w-96 !overflow-scroll">
            <FormParams />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={45} className="flex flex-1 min-w-96">
            <CodeEditor />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </FormProvider>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <div className="h-screen flex flex-col">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/visualisation" element={<Visualisation />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
