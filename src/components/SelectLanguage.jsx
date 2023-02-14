import { useEffect } from "react";
import pb from "../pb/pocketbase";
import { useGlobalContext } from "../context/ContextProvider";

const SelectLanguage = ({ editorIndex, editorID }) => {
    const { language, setLanguage } = useGlobalContext();

    const handleSelect = (e) => {
        setLanguage(e.target.value)
    };

    const updateLanguage = async () => {
        const data = {
            "language": language
        };
        await pb.collection('classes').update(editorID, data);
        const storage = JSON.parse(localStorage.getItem("classes"));
        storage[editorIndex].language = language;
        localStorage.setItem("classes", JSON.stringify(storage));
    }
    
    useEffect(() => {
        updateLanguage();
    }, [language])

    return (
        <select
            onChange={handleSelect}
            className="select select-bordered w-full max-w-[10rem]"
            value={language}
        >
            <option value="javascript" selected={language === "javascript"}>Javascript</option>
            <option value="python" selected={language === "python"}>Python</option>
            <option value="java" selected={language === "java"}>Java</option>
        </select>
    );
};

export default SelectLanguage;