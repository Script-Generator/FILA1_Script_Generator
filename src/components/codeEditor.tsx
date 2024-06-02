import { useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { StreamLanguage } from '@codemirror/language';
import { shell } from '@codemirror/legacy-modes/mode/shell';
import { useTheme } from '@/components/theme-provider';
import { useFormContext } from '@/context/formContext.tsx';
import { ScriptBuilder } from '@/utils/scriptBuilder.ts';
import { githubDark, githubLight } from '@uiw/codemirror-theme-github';
import ZipGeneratorComponent from '@/context/zipGenerator';

const CodeEditor = () => {
  const { theme } = useTheme();
  const { formObject } = useFormContext();
  const isDarkMode =
    theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const [value, setValue] = useState(new ScriptBuilder(formObject).export());

  useEffect(() => {
    setValue(new ScriptBuilder(formObject).export());
  }, [formObject]);

  return (
    <div className="p-4 flex flex-col w-full">
      <CodeMirror
        className="text-left flex-grow overflow-scroll"
        value={value}
        extensions={[StreamLanguage.define(shell)]}
        theme={isDarkMode ? githubDark : githubLight}
        basicSetup={{
          lineNumbers: true,
          tabSize: 4,
        }}
      />
      {/* 
      Assuming ZipGeneratorComponent accepts a prop named codeEditorValue, 
      pass the updated value to it
      */}
      <ZipGeneratorComponent codeEditorValue={value} />
    </div>
  );
};

export default CodeEditor;
