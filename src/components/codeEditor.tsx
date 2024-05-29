import CodeMirror from '@uiw/react-codemirror';
import { StreamLanguage } from '@codemirror/language';
import { shell } from '@codemirror/legacy-modes/mode/shell';
<<<<<<< HEAD
import {useState, useCallback, useEffect} from 'react';
=======
import { useState, useCallback } from 'react';
>>>>>>> 08277ae (@dev:Ajout de l'export du script dans un zip)
import { githubDark, githubLight } from '@uiw/codemirror-theme-github';
import { useTheme } from '@/components/theme-provider';

import { ScriptBuilder } from '@/utils/scriptBuilder';
import { useFormContext } from '@/context/formContext';

<<<<<<< HEAD
import ZipGeneratorComponent from "@/context/zipGenerator.tsx";
=======
import { ScriptParser } from '@/utils/scriptParser';
import { FormObject } from '@/context/formObject';
import ZipGeneratorComponent from "@/context/zipGenerator.tsx";

>>>>>>> 08277ae (@dev:Ajout de l'export du script dans un zip)
const CodeEditor = () => {
    const {theme} = useTheme();
    const isDarkMode =
        theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

<<<<<<< HEAD
  const { formObject } = useFormContext();
  const [value, setValue] = useState('');

  useEffect(() => {
    const newValue = new ScriptBuilder(formObject).export();
    setValue(newValue);
  }, [formObject]);
=======
    const test : FormObject = ({
      jar: [{ file: null, jvmArgs: '' }],
      serverPath: '/home/test',
      population: { file: [] },
      logDir: '',
      args: '',
      sbatch: [{key: 'test', value: '1'}, {key: 'other', value: '2'}],
  });
>>>>>>> 08277ae (@dev:Ajout de l'export du script dans un zip)

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
        {/* Give the value to the ZipGeneratorComponent */}
        <ZipGeneratorComponent codeEditorValue={value} />
    </div>
  );
};

export default CodeEditor;
