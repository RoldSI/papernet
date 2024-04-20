import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import Submit from "./pages/Submit";
import Review from "./pages/Review";
import Browse from "./pages/Browse";
// <<<<<<< HEAD
import Donate from "./pages/Donate";
// =======
import logo from './pages/assets/Peer_Logo_Full.svg';
import metamaskLogo from './pages/assets/metamask_logo.png';
import arrowRight from './pages/assets/arrow_right.png';
import Web3 from 'web3';
// >>>>>>> 3ab7309 (landing page design done)

function App() {
    const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);

    useEffect(() => {
        checkMetaMaskConnection();
        window.ethereum.on('accountsChanged', (accounts) => {
            setIsMetaMaskConnected(accounts.length > 0);
        });
    }, []);

    const checkMetaMaskConnection = async () => {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            const accounts = await web3.eth.getAccounts();
            setIsMetaMaskConnected(accounts.length > 0);
        }
    };

    const connectMetaMask = async () => {
        if (window.ethereum) {
            try {
                // Request account access if needed
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                // Accounts now exposed, refresh the state of accounts
                checkMetaMaskConnection();
            } catch (error) {
                console.error("Failed to connect MetaMask:", error);
            }
        } else {
            alert("MetaMask is not installed. Please consider installing it: https://metamask.io/download.html");
        }
    };

    return (
        <div>
            <header className="flex justify-between items-center bg-white-800 text-white p-4">
                <Link to="/" className="flex items-center peer_logo">
                    <img src={logo} alt="Peer Logo" className="mr-4" />
                </Link>
                <nav className="flex items-center">
                    <ul className="flex space-x-4 mr-4">
                        <li><Link to="/submit">Submit</Link></li>
                        <li><Link to="/review">Review</Link></li>
                        <li><Link to="/browse">Browse</Link></li>
                        <li><Link to="/donate">Donate</Link></li>
                    </ul>
                    <button onClick={connectMetaMask} className={`flex items-center px-3 py-2 rounded ${isMetaMaskConnected ? 'connected' : 'bg-blue-500'}`}>
                        {isMetaMaskConnected ? (
                            <>
                                <div className="status-dot bg-green-500" />
                                Connected
                            </>
                        ) : (
                            <>
                                <img src={metamaskLogo} alt="MetaMask Logo" className="h-6 mr-2" />
                                Connect
                                <img src={arrowRight} alt="Arrow Right" className="h-4 ml-2" />
                            </>
                        )}
                    </button>
                </nav>
            </header>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/submit" element={<Submit />} />
                <Route path="/review" element={<Review />} />
                <Route path="/browse" element={<Browse />} />
                <Route path="/donate" element={<Donate />} />
            </Routes>
        </div>
    );
}

export default App;
