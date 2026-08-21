import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tutorials from "./pages/Tutorials/TutorialsPage";

export default function App() {
    return <BrowserRouter>
        <Routes>
            <Route path="/tutorials/*" element={<Tutorials/>} />
        </Routes>
    </BrowserRouter>
}
