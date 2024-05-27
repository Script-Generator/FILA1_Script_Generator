import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import React from "react";

const CodeEditor = () => {
    const [value, setValue] = React.useState("console.log('hello world!');");
    const onChange = React.useCallback((val: string) => {
        console.log('val:', val);
        setValue(val);
    }, []);
    return <CodeMirror value={value} height="200px" extensions={[javascript({ jsx: true })]} onChange={onChange} />;
}

export default CodeEditor;
