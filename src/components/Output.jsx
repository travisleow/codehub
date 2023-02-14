import { useState, useEffect } from "react";
import { useWindowSize } from "../hooks/useWindowSize";
import Terminal, { ColorMode, TerminalOutput } from "react-terminal-ui";

const Output = ({ output }) => {
    const [width] = useWindowSize();
    const [height, setHeight] = useState(100);
    const [terminalLineData, setTerminalLineData] = useState([
        <TerminalOutput>Output</TerminalOutput>,
    ]);

    useEffect(() => {
        setTerminalLineData([<TerminalOutput>{output}</TerminalOutput>]);
    }, [output]);

    useEffect(() => {
        console.log(width)
        setHeight(width >= 1024 ? 500 : 100);
    }, [width]);

    return (
        <div>
            <Terminal
                name="Output"
                height={height}
                colorMode={ColorMode.Dark}
            >
                {terminalLineData}
            </Terminal>
        </div>
    );
};

export default Output;
