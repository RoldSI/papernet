import React, { useState} from "react";
import axios from 'axios';
import { Web3 } from "web3";
import ABI from "./../abi.json";
import { DNA } from 'react-loader-spinner';

const FormData = require('form-data')
const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJiZmIzODc4ZC1jODFkLTQ1ZTEtYjliZC05NDA2ZWUzMjY3MGUiLCJlbWFpbCI6InN0ZW50X3N0ZXBzXzB0QGljbG91ZC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNDI5OGU1YzU0MTM0NWJjMTllNjUiLCJzY29wZWRLZXlTZWNyZXQiOiJmNGU2Y2QwYTRkMzhjYjhkNTU5NGQ1OTU2OGJlZTMzOGM5ZWEyNzU2OWRkNWNiNjJjMjk1ZDk1MDI2MWQ0NWUzIiwiaWF0IjoxNzEzNjE0MDgxfQ.zpmDvalI4RMZZ3S0VnpQbPzw6nGGald31M3IjvQ4xx4';

const pinFileToIPFS = async (file, name) => {
    const formData = new FormData();
    // const src = "path/to/file.png";

    // const file = fs.createReadStream(src)
    formData.append('file', file)

    const pinataMetadata = JSON.stringify({
        name: name,
    });
    formData.append('pinataMetadata', pinataMetadata);

    const pinataOptions = JSON.stringify({
        cidVersion: 0,
    })
    formData.append('pinataOptions', pinataOptions);

    try{
        const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
            maxBodyLength: "Infinity",
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                'Authorization': `Bearer ${JWT}`
            }
        });
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log(error);
        return null
    }
}


function Submit() {
    // State to store the selected file
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [authors, setAuthors] = useState([]);
    const [citations, setCitations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [thank, setThank] = useState(false);

    let web3, contract, accounts;

    // Handle file input change
    const handleFileChange = (event) => {
        setFile(event.target.files[0]); // Update the state with the new file
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleAuthorsChange = (event) => {
        // Split by commas and convert to integers
        const nums = event.target.value.split(',').map(num => parseInt(num.trim(), 10));
        setAuthors(nums);
    };

    const handleCitationsChange = (event) => {
        const nums = event.target.value.split(',').map(num => parseInt(num.trim(), 10));
        setCitations(nums);
    };

    const thankAck = (event) => {
        setThank(false);
    };

    async function connect() {
        //initialize injecteed provider
        web3 = new Web3(window.ethereum);

        //request accounts
        accounts = await web3.eth.requestAccounts();
    }

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) {
            alert('Please select a file to upload.');
            return;
        }
        setLoading(true);
        const res = await pinFileToIPFS(file, title);
        const id = res['IpfsHash'];

        await connect();
        contract = new web3.eth.Contract(ABI, "0x1abF46F1d1cD48ae64cD1Ff1cA5E2FfA8EB3ef0F"); //initialzie contract
        await contract.methods.addEntry(id, citations, authors).send({ from: accounts[0] });

        // alert(`Title: ${title}, Authors: ${authors.join(', ')}, Citations: ${citations.join(', ')}, File: ${file.name} was uploaded successfully, file hash: ${id}`);
        setFile(null);
        setTitle('');
        setAuthors([]);
        setCitations([]);

        setThank(true);
        setLoading(false);
    };

    return (
        loading ? (
            <div className="flex justify-center pt-20">
                <DNA/>
            </div>
        ) : (
            thank ? (
                <div className="flex justify-center pt-20">
                    <h2>Thank you for your submission. It has entered the review process.</h2>
                    <button onClick={thankAck} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        New submission.
                    </button>
                </div>
            ) : (<form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 shadow-md rounded-lg bg-white">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Paper Title:
                    <input
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </label>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Authors addresses (comma separated):
                    <input
                        type="text"
                        value={authors}
                        onChange={handleAuthorsChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </label>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Cited paper IDs (comma separated):
                    <input
                        type="text"
                        value={citations}
                        onChange={handleCitationsChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </label>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Upload paper:
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </label>
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Submit Paper
            </button>
        </form>
    )));
}

export default Submit
