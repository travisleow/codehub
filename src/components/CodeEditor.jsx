import { useState, useEffect } from "react";
import { loader } from "@monaco-editor/react";
import debounce from "lodash.debounce";
import Editor from "@monaco-editor/react";

const CodeEditor = ({ onChange, code, setCode, language, isOwner }) => {
    const [value, setValue] = useState(code || "");
    const [hasLoaded, setHasLoaded] = useState(false);

    const changeTheme = (theme) => {
        setHasLoaded(false);
        return new Promise((res) => {
            Promise.all([
                loader.init(),
                import("monaco-themes/themes/Dracula.json"),
            ]).then(([monaco, themeData]) => {
                monaco.editor.defineTheme(theme, themeData);
                res();
                setHasLoaded(true)
            });
        });
    };

    useEffect(() => {
        changeTheme('dracula')
    }, [])

    const updateCode = (value) => {
        console.log("hi");
        setValue(value);
        setCode(value);
        onChange("code", value);
    };

    const debouncedUpdateCode = debounce(updateCode, 500);

    return (
        <div className="lg:w-[70%] lg:h-[90vh] h-[40vh] w-full">
            {hasLoaded && <Editor
                language={language}
                value={value}
                defaultValue={code}
                options={{
                    wordWrap: "on",
                    fontFamily: "Consolas",
                    fontSize: 22,
                    autoIndent: true,
                    readOnly: isOwner ? false : true,
                }}
                theme="dracula"
                onChange={debouncedUpdateCode}
            />}
        </div>
    );
};

export default CodeEditor;
