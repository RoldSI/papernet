import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import Submit from "./pages/Submit";
import Review from "./pages/Review";
import Browse from "./pages/Browse";
import Donate from "./pages/Donate";
import logo from './pages/assets/Peer_Logo_Full.svg';
import logoAlt from './pages/assets/Peer_Logo_Alt.svg';
import metamaskLogo from './pages/assets/metamask_logo.png';
import arrowRight from './pages/assets/arrow_right.png';
import Web3 from 'web3';

function App() {
    const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);
    const location = useLocation();

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
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                checkMetaMaskConnection();
            } catch (error) {
                console.error("Failed to connect MetaMask:", error);
            }
        } else {
            alert("MetaMask is not installed. Please consider installing it: https://metamask.io/download.html");
        }
    };

    const isHomePage = location.pathname === '/';

    return (
        <div>
            <header className={`flex justify-between items-center p-4 ${isHomePage ? 'bg-transparent' : 'text-white'}`} style={{
                backgroundColor: isHomePage ? 'transparent' : '#2B3D40', // Ensure correct background color when not on home page
                boxShadow: isHomePage ? 'none' : '0 2px 10px rgba(0,0,0,0.3)', // Drop shadow when not on the home page
                marginBottom: '20px'
            }}>
                <Link to="/" className="flex items-center peer_logo">
                    <img src={isHomePage ? logo : logoAlt} alt="Peer Logo" style={{ height: isHomePage ? '120px' : '50px' }} /> {/* Larger logo on home page */}
                </Link>
                <nav className="flex items-center">
                    <ul className="flex space-x-4 mr-4">
                        <li><Link to="/submit" className={isHomePage ? '' : 'text-white'}>Submit</Link></li>
                        <li><Link to="/review" className={isHomePage ? '' : 'text-white'}>Review</Link></li>
                        <li><Link to="/browse" className={isHomePage ? '' : 'text-white'}>Browse</Link></li>
                        <li><Link to="/donate" className={isHomePage ? '' : 'text-white'}>Donate</Link></li>
                    </ul>
                    <button id="white_text" onClick={connectMetaMask} className={`flex items-center px-3 py-2 rounded ${isMetaMaskConnected ? 'connected' : 'bg-blue-500'}`}>
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
