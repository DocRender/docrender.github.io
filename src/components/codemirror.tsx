import React, { useEffect, useRef } from "react";
import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
import { useCodeMirror } from "@uiw/react-codemirror";

const Code = ({ value, lang }: { value: any; lang: string }) => {
  const code = JSON.stringify(value, null, 2);
  const editor = useRef() as React.MutableRefObject<HTMLDivElement>;
  const { setContainer } = useCodeMirror({
    container: editor.current,
    theme: "light",
    extensions: [lang === "json" ? json() : javascript({ jsx: true })],
    value: code,
  });

  useEffect(() => {
    if (editor.current) {
      setContainer(editor.current);
    }
  }, [setContainer]);

  return <div ref={editor} style={{ width: "100%", height: "100%" }} />;
};

export default Code;
