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

  const [value, setValue] = useState(new ScriptBuilder(formObject).export().bashScript);
  useEffect(() => {
    setValue(new ScriptBuilder(formObject).export().bashScript);
  }, [formObject]);

  const [value2, setValue2] = useState(new ScriptBuilder(formObject).export().commandList);
  useEffect(() => {
    setValue2(new ScriptBuilder(formObject).export().commandList);
  }, [formObject]);

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    console.log(value);
  };

  return (
    <div className="p-4 flex flex-col w-full overflow-scroll">
      <h1 className="text-x2 font-bold p-1">Script :</h1>
      <CodeMirror
        className="text-left overflow-scroll mb-4"
        value={value}
        extensions={[StreamLanguage.define(shell)]}
        theme={isDarkMode ? githubDark : githubLight}
        basicSetup={{
          lineNumbers: true,
          tabSize: 4,
        }}
        onChange={(value) => handleValueChange(value)}
      />
      <h1 className="text-x2 font-bold p-1">Command list :</h1>
      <CodeMirror
        className="text-left overflow-scroll mb-8 min-h-20"
        value={value2}
        extensions={[StreamLanguage.define(shell)]}
        theme={isDarkMode ? githubDark : githubLight}
        readOnly={true}
        editable={false}
        basicSetup={{
          lineNumbers: true,
          tabSize: 4,
        }}
      />
      <ZipGeneratorComponent codeEditorValue={value} javaCommandValue={value2} />
    </div>
  );
};

export default CodeEditor;
