import { Web3 } from "web3";
import React, { useState } from "react";
import { DNA } from "react-loader-spinner";

function Donate() {
    const [loading, setLoading] = useState(false);
    const [donationAmount, setDonationAmount] = useState("0.1"); // Default donation amount

    let web3, accounts;

    async function connect() {
        if (typeof window.ethereum !== 'undefined') {
            web3 = new Web3(window.ethereum);
            accounts = await web3.eth.requestAccounts();
            console.log(accounts)
        } else {
            console.error('MetaMask is not installed!');
        }
    }

    async function donateETH() {
        setLoading(true);
        await connect();
        if (!web3) {
            console.error('Web3 is not initialized!');
            return;
        }

        const recipientAddress = "0x6169710e36a89cc2ef55D4e209dAC05BF4Ce0A48"; // Replace with your ETH address
        const amountToSend = web3.utils.toWei(donationAmount, 'ether'); // Convert the amount to wei

        try {
            const tx = {
                from: accounts[0],
                to: recipientAddress,
                value: amountToSend
            };

            const transactionReceipt = await web3.eth.sendTransaction(tx);
            console.log(transactionReceipt);
            alert(`Donation of ${donationAmount} ETH successful!`);
        } catch (error) {
            console.error('Donation failed!', error);
            alert('Donation failed!');
        }

        setLoading(false);
    }

    return (
        <div>
            {loading ? (
                <div className="flex flex-col justify-center items-center pt-20">
                    <DNA/> <br/>
                    <p>Loading Donation ...</p>
                </div>
            ) : (
                <div className="max-w-lg mx-auto p-4 shadow-md rounded-lg bg-white flex flex-col">
                    <input
                        type="text"
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                        className="border border-gray-400 rounded px-3 py-2 mb-4"
                        placeholder="Enter amount to donate (ETH)"
                    />
                    <button
                        onClick={donateETH}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Donate ETH to Funding Pool
                    </button>
                </div>
            )}
        </div>
    );
}

export default Donate;
