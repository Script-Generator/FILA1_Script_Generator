import CodeMirror from '@uiw/react-codemirror';
import {StreamLanguage} from '@codemirror/language';
import {shell} from '@codemirror/legacy-modes/mode/shell';
import {useState, useCallback} from 'react';
import {githubDark, githubLight} from '@uiw/codemirror-theme-github';
import {useTheme} from '@/components/theme-provider';
import ZipGeneratorComponent from "@/context/zipGenerator.tsx";
import {useFormContext} from "@/context/formContext.tsx";
import {ScriptBuilder} from "@/utils/scriptBuilder.ts";

const CodeEditor = () => {
    const {theme} = useTheme();
    const isDarkMode =
        theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const {formObject} = useFormContext();

    const [value, setValue] = useState(new ScriptBuilder(formObject).export());

    // TODO Sprint 2
    const onChange = useCallback((codeEditorValue: string) => {
        setValue(codeEditorValue);
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
        <ZipGeneratorComponent codeEditorValue={value} />
    </div>
  );
};

export default CodeEditor;
