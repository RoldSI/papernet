import { Routes, Route, Link } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import Submit from "./pages/Submit";
import Review from "./pages/Review";
import Browse from "./pages/Browse";

function App() {
    return (
        <div>
            <header className="bg-gray-800 text-white p-4">
                <nav>
                    <ul className="flex space-x-4">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/submit">Submit</Link></li>
                        <li><Link to="/review">Review</Link></li>
                        <li><Link to="/browse">Browse</Link></li>
                    </ul>
                </nav>
            </header>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/submit" element={<Submit />} />
                <Route path="/review" element={<Review />} />
                <Route path="/browse" element={<Browse />} />
            </Routes>
        </div>
    );
}

export default App;
