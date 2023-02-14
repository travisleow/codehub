import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../context/ContextProvider";
import pb from "../pb/pocketbase";
import qs from "qs";
import axios from "axios";
import CodeEditor from "../components/CodeEditor";
import Output from "../components/Output";
import SelectLanguage from "../components/SelectLanguage";
import Header from "../components/Header";

const Editor = () => {
    const { editorIndex, editorID } = useParams();
    const { language, setLanguage, setName } = useGlobalContext();
    const [isOwner, setIsOwner] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [code, setCode] = useState(undefined);
    const [output, setOutput] = useState(undefined);

    const fetchData = async () => {
        setIsFetching(true);
        const record = await pb.collection("classes").getOne(editorID, {
            expand: "relField1,relField2.subRelField",
        });
        setName(record.name);
        setCode(record.code);
        setLanguage(record.language);
        setIsFetching(false);
    };

    const updateCode = async () => {
        const data = {
            "code": code,
        };
        
        await pb.collection('classes').update(editorID, data);
    };

    useEffect(() => {
        const storage = JSON.parse(localStorage.getItem("classes"));
        if (storage) {
            const classes = storage.map((item) => item.id);
            if (classes.includes(editorID)) {
                setIsOwner(true);
            } else {
                setIsOwner(false);
            }
        }
    }, [])


    
    useEffect(() => {
        updateCode();
    }, [code])

    useEffect(() => {
        fetchData();
    }, []);

    const onChange = (action, data) => {
        switch (action) {
            case "code":
                setCode(data);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async () => {
        let convertedLang;
        if (language === "javascript") {
            convertedLang = "js";
        } else if (language === "python") {
            convertedLang = "py";
        } else if (language === "java") {
            convertedLang = "java";
        }
        const formData = qs.stringify({
            code: code,
            language: convertedLang,
        });

        const options = {
            method: "post",
            url: "https://api.codex.jaagrav.in",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            data: formData,
        };

        const response = await axios.request(options);
        const data = response.data;
        setOutput(data.output || data.error);
    };
    return (
        <div className="h-screen">
            <Header />
            <div className="flex lg:flex-row flex-col">
                {!isFetching && (
                    <CodeEditor
                        handleSubmit={handleSubmit}
                        language={language}
                        code={code}
                        isOwner={isOwner}
                        setCode={setCode}
                        onChange={onChange}
                    />
                )}
                <div className="h-90vh lg:w-[35rem] flex flex-col lg:border-l-2 lg:border-t-0 py-4 gap-4 border-t-2 border-primary justify-between px-6">
                    <Output output={output} />
                    <div className="flex flex-row gap-8">
                        <button
                            className="btn btn-primary w-1/4"
                            onClick={handleSubmit}
                        >
                            Run
                        </button>
                        <SelectLanguage editorIndex={editorIndex} editorID={editorID} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Editor;
