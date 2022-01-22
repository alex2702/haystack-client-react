import React from "react";
import { Home } from "../pages/Home/Home";
import {
    MemoryRouter as Router,
    Routes,
    Route
} from "react-router-dom";

function App() {
    return (
        <Router initialEntries={[window.location.pathname]}>
            <Routes>
                <Route path="/" element={ <Home /> } />
            </Routes>
        </Router>
    );
}

export default App;