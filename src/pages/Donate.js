import { Web3 } from "web3";
import React, { useState } from "react";
import { DNA } from "react-loader-spinner";

function Donate() {
    const [loading, setLoading] = useState(false);
    const [donationAmount, setDonationAmount] = useState("0.1"); // Default donation amount
    const [donationAddress, setDonationAddress] = useState(""); // Ethereum address to donate to

    let web3, accounts;

    async function connect() {
        if (typeof window.ethereum !== 'undefined') {
            web3 = new Web3(window.ethereum);
            accounts = await web3.eth.requestAccounts();
        } else {
            console.error('MetaMask is not installed!');
        }
    }

    async function donateETH() {
        if (!web3) {
            console.error('Web3 is not initialized!');
            return;
        }

        const amount = web3.utils.toWei(donationAmount, "ether");
        try {
            await web3.eth.sendTransaction({
                to: donationAddress,
                from: accounts[0],
                value: amount,
            });
            alert("Donation Successful!");
        } catch (error) {
            console.error("Error donating:", error);
            alert("Error donating. Please try again later.");
        }
    }

    async function init() {
        setLoading(true);
        await connect();
        setLoading(false);
    }

    return (
        <div className="max-w-xl mx-auto p-4 shadow-md rounded-lg bg-white">
            {loading ? (
                <div className="flex flex-col justify-center items-center pt-20">
                    <DNA />
                    <p>Loading Donation ...</p>
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center pt-20">
                    <input
                        type="text"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                        className="border border-gray-400 rounded px-3 py-2 mb-4"
                        placeholder="Enter amount to donate (ETH)"
                    />
                    <input
                        type="text"
                        value={donationAddress}
                        onChange={(e) => setDonationAddress(e.target.value)}
                        className="border border-gray-400 rounded px-3 py-2 mb-4"
                        placeholder="Enter recipient Ethereum address"
                    />
                    <button
                        onClick={donateETH}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Donate ETH
                    </button>
                </div>
            )}
        </div>
    );
}

export default Donate;
