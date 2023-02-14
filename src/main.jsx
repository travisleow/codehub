import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Toaster } from "react-hot-toast";
import { ContextProvider } from "./context/ContextProvider";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ContextProvider>
            <Toaster />
            <App />
        </ContextProvider>
    </React.StrictMode>
);