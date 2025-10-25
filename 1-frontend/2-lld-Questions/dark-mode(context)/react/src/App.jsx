import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "./App.css";

import {ThemeProvider} from "./theme-context.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Blog from "./pages/Blog.jsx";
import Navbar from "./components/NavBar.jsx";

const App = () => {
    return (
        <ThemeProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/blog" element={<Blog />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;
