import CodeMirror from '@uiw/react-codemirror';
import { StreamLanguage } from '@codemirror/language';
import { shell } from '@codemirror/legacy-modes/mode/shell';
import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { githubDark, githubLight } from '@uiw/codemirror-theme-github';
import { useTheme } from '@/components/theme-provider';


import { ScriptParser } from '@/utils/scriptParser';
import { FormObject } from '@/model/formObject';

const CodeEditor = () => {
  const { theme } = useTheme();
  const isDarkMode =
    theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);


    const test : FormObject = ({
      jar: [{ file: null, jvmArgs: '' }],
      serverPath: '/home/test',
      population: { file: [] },
      logDir: '',
      args: '',
      sbatch: [{key: 'test', value: '1'}, {key: 'other', value: '2'}],
  });

  const [value] = useState(new ScriptParser(test).export());

  // TODO Sprint 2
  const onChange = useCallback((codeEditorValue: string) => {
    console.log('code editor:', codeEditorValue);
  }, []);

  return (
    <div className="p-8 flex flex-col w-full">
      <CodeMirror
        className="text-left p-6 flex-grow overflow-scroll"
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
