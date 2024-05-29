import CodeMirror from '@uiw/react-codemirror';
import { StreamLanguage } from '@codemirror/language';
import { shell } from '@codemirror/legacy-modes/mode/shell';
import { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { githubDark, githubLight } from '@uiw/codemirror-theme-github';
import { useTheme } from '@/components/theme-provider';

import { ScriptBuilder } from '@/utils/scriptBuilder';
import { useFormContext } from '@/context/formContext';

const CodeEditor = () => {
  const { theme } = useTheme();
  const isDarkMode =
    theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const { formObject } = useFormContext();
  const [value, setValue] = useState('');

  useEffect(() => {
    const newValue = new ScriptBuilder(formObject).export();
    console.log(newValue);
    setValue(newValue);
  }, [formObject]);

  const onChange = useCallback((codeEditorValue: string) => {
    console.log('code editor:', codeEditorValue);
  }, []);

  return (
    <div className="p-4 flex flex-col w-full">
      <CodeMirror
        className="text-left flex-grow overflow-scroll"
        value={value}
        extensions={[StreamLanguage.define(shell)]}
        onChange={onChange}
        theme={isDarkMode ? githubDark : githubLight}
        basicSetup={{
          lineNumbers: true,
          tabSize: 4,
        }}
      />
      <div className="mt-4 p-8 absolute bottom-0 right-0">
        <Button className="">Export</Button>
      </div>
    </div>
  );
};

export default CodeEditor;
