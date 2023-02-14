import { useGlobalContext } from "../context/ContextProvider";
import ToggleThemeButton from "./ToggleThemeButton";
import CreateClass from "./CreateClass";
import { Link } from "react-router-dom";

const Header = ({ getClasses }) => {
    const { theme, name } = useGlobalContext();

    return (
        <div>
            <div className="navbar bg-base-100 h-[0.5rem] flex-row justify-between">
                <Link to="/">
                    <a
                        className={
                            theme == "dark"
                                ? "text-primary-content text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 decoration-8 decoration-gray-200 dark:decoration-gray-800"
                                : "text-primary-content text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-600  decoration-8 decoration-gray-200 dark:decoration-gray-800"
                        }
                    >
                        CodeHub
                    </a>
                </Link>
    
                {name ? <p className="font-bold text-4xl text-primary-content">{name}</p> : <CreateClass getClasses={getClasses} />}
    
                <ToggleThemeButton />
            </div>
        </div>
    );
};

export default Header;
