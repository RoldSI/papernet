import {useState} from "react";
import {Web3} from "web3";
import ABI from "../abi.json";

function Review() {
    const [id, setId] = useState(9999999);
    const [ipfsId, setIpfsId] = useState(0);
    const [wallet, setWallet] = useState("0x");

    let web3, contract, accounts;

    async function connect() {
        //initialize injecteed provider
        web3 = new Web3(window.ethereum);

        //request accounts
        accounts = await web3.eth.requestAccounts();

        //update front end
        setWallet(String(accounts[0]));
        alert("connected");
    }

    async function getEntries() {
        await connect();
        contract = new web3.eth.Contract(ABI, "0xc0e970d9c1806fad4e68a3078251dbe1ce37a663"); //initialzie contract
        try {
            const entriesFromContract = await contract.methods.getEntries().call();
            if (entriesFromContract.length > id) {
                setIpfsId(entriesFromContract[id].id);
                alert("ipfs id updated");
            } else {
                console.error('No entry exists at the given index');
            }
        } catch (error) {
            console.error('Error fetching entries:', error);
        }
    }

    async function getLeastVotedEntryId() {
        await connect();
        contract = new web3.eth.Contract(ABI, "0xc0e970d9c1806fad4e68a3078251dbe1ce37a663"); //initialzie contract
        const response = await contract.methods.getLeastVotedEntryId().call();
        //update front end
        setId(parseInt(response));
    }

    async function upvote() {
        await connect();
        contract = new web3.eth.Contract(ABI, "0xc0e970d9c1806fad4e68a3078251dbe1ce37a663"); //initialzie contract
        await contract.methods.vote(id, true).send({ from: accounts[0] });
        //update front end
        setId(99999);
        setIpfsId(0);
    }

    async function downvote() {
        await connect();
        contract = new web3.eth.Contract(ABI, "0xc0e970d9c1806fad4e68a3078251dbe1ce37a663"); //initialzie contract
        await contract.methods.vote(id, false).send({ from: accounts[0] });
        //update front end
        setId(99999);
        setIpfsId(0);
    }

    const baseURL = 'https://ipfs.io/ipfs/';
    const fullURL = `${baseURL}${ipfsId}`;

    return (
        <div className="max-w-lg mx-auto p-4 shadow-md rounded-lg bg-white flex flex-col">
            <button onClick={getLeastVotedEntryId} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                click to load for review
            </button>
            <button onClick={getEntries} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                click to load review content
            </button>
            <p>ipfs id: {ipfsId}</p>
            <a href={fullURL} target="_blank" rel="noopener noreferrer">
                Access IPFS Content
            </a>
            <p>id: {id}</p>
            <p>wallet: {wallet}</p>
            <button onClick={upvote} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                upvote
            </button>
            <button onClick={downvote} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                downvote
            </button>
        </div>
    );
}

export default Review
