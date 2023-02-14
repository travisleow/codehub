import { useContext, createContext, useState } from "react";

const Context = createContext();

export const useGlobalContext = () => {
    return useContext(Context);
};

export const ContextProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
    const [language, setLanguage] = useState(undefined);
    const [name, setName] = useState(undefined);

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "retro" : "dark");
    };

    const value = {
        theme,
        language,
        name,
        toggleTheme,
        setLanguage,
        setName
    }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
};
