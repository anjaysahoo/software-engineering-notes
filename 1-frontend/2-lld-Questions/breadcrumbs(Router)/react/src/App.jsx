import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "./App.css";
import ProductDetail from "./pages/ProductDetail.jsx";
import ProductListing from "./pages/ProductListing.jsx";
import Breadcrumbs from "./components/Breadcrumbs.jsx";
import Home from "./pages/Home.jsx";

const App = () => {
    return (
        <Router>
            <div className="app">
                <Breadcrumbs />
                <hr />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<ProductListing />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
