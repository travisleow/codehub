import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Editor from "./pages/Editor";
import Home from "./pages/Home";

function App() {

    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/editor/:editorIndex/:editorID" element={<Editor />} />
            </Routes>
        </Router>
    );
}

export default App;
