import { useEffect } from "react";
import { useGlobalContext } from "../context/ContextProvider";
import { FiSun } from "react-icons/fi";
import { BsFillMoonFill } from "react-icons/bs";

const ToggleThemeButton = () => {
    const { theme, toggleTheme } = useGlobalContext();

    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.querySelector("html").dataset.theme = theme;
    }, [theme]);

    return (
        <button
            onClick={toggleTheme}
            className={
                theme === "dark"
                    ? "btn btn-secondary bg-amber-200 border-amber-200 hover:bg-amber-400 hover:border-amber-400"
                    : "btn btn-secondary bg-purple-600 border-purple-600 hover:bg-purple-800 hover:border-purple-800"
            }
        >
            {theme === "dark" ? (
                <FiSun size={24} color="black" />
            ) : (
                <BsFillMoonFill size={22} color="white" />
            )}
        </button>
    );
};

export default ToggleThemeButton;