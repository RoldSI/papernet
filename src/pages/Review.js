import React, {useState} from "react";
import {Web3} from "web3";
import ABI from "../abi.json";
import {DNA} from "react-loader-spinner";

function Review() {
    const [id, setId] = useState(9999999);
    const [ipfsId, setIpfsId] = useState(0);
    const [todo, setToDo] = useState(true);
    const [loading, setLoading] = useState(false);
    const [init, setInit] = useState(true);
    const [voting, setVoting] = useState(false);

    let web3, contract, accounts;

    async function procesLoad() {
        await connect();
        if(!await checkAvailability()) {
            setToDo(false);
            return;
        }
        const id = await getLeastVotedEntryId();
        await getEntries(id);
        setLoading(false);
    }

    async function connect() {
        //initialize injecteed provider
        web3 = new Web3(window.ethereum);

        //request accounts
        accounts = await web3.eth.requestAccounts();
    }

    async function getEntries(id) {
        contract = new web3.eth.Contract(ABI, "0x1abF46F1d1cD48ae64cD1Ff1cA5E2FfA8EB3ef0F"); //initialzie contract
        try {
            const entriesFromContract = await contract.methods.getEntries().call();
            console.log(entriesFromContract);
            console.log(entriesFromContract.length);
            console.log(id);
            if (entriesFromContract.length > id) {
                setIpfsId(entriesFromContract[id].id);
            } else {
                console.error('No entry exists at the given index');
            }
        } catch (error) {
            console.error('Error fetching entries:', error);
        }
    }

    async function getLeastVotedEntryId() {
        contract = new web3.eth.Contract(ABI, "0x1abF46F1d1cD48ae64cD1Ff1cA5E2FfA8EB3ef0F"); //initialzie contract
        const response = await contract.methods.getLeastVotedEntryId().call();
        setId(parseInt(response));
        return(parseInt(response))
    }

    async function checkAvailability() {
        contract = new web3.eth.Contract(ABI, "0x1abF46F1d1cD48ae64cD1Ff1cA5E2FfA8EB3ef0F"); //initialzie contract
        return await contract.methods.toReview().call();
    }

    async function upvote() {
        setVoting(true);
        await connect();
        contract = new web3.eth.Contract(ABI, "0x1abF46F1d1cD48ae64cD1Ff1cA5E2FfA8EB3ef0F"); //initialzie contract
        await contract.methods.vote(id, true).send({ from: accounts[0] });
        //update front end
        setId(99999);
        setIpfsId(0);
        setLoading(true);
        setVoting(false);
        procesLoad();
    }

    async function downvote() {
        setVoting(true);
        await connect();
        contract = new web3.eth.Contract(ABI, "0x1abF46F1d1cD48ae64cD1Ff1cA5E2FfA8EB3ef0F"); //initialzie contract
        await contract.methods.vote(id, false).send({ from: accounts[0] });
        //update front end
        setId(99999);
        setIpfsId(0);
        setLoading(true);
        setVoting(false);
        procesLoad();
    }

    const baseURL = 'https://ipfs.io/ipfs/';
    const fullURL = `${baseURL}${ipfsId}`;

    const handleClick = () => {
        // This function will open the URL in a new tab
        window.open(fullURL, '_blank', 'noopener,noreferrer');
    };

    const handleStart = async () => {
        setLoading(true);
        setInit(false);
        await procesLoad();
    }

    if(!todo) {
        return (
            <div className="flex flex-col justify-center items-center pt-20">
                <p>Nothing to review at the moment ...</p>
            </div>
        );
    }

    if(init) {
        return (
            <div className="flex flex-col justify-center items-center pt-20">
                <button onClick={handleStart} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Start reviewing ...
                </button>
            </div>
        );
    }

    return (
        loading ? (
            <div className="flex flex-col justify-center items-center pt-20">
                <DNA/>
                <p>Loading Paper ...</p>
            </div>
        ) : ( voting ? (
            <div className="flex flex-col justify-center items-center pt-20">
                <DNA/>
                <p>Processing review ...</p>
            </div>
        ) : (
        <div className="max-w-lg mx-auto p-4 shadow-md rounded-lg bg-white flex flex-col">
            <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Link to Paper
            </button><br/>
            <div className="flex justify-center gap-2">
                <button onClick={downvote} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline">
                    downvote
                </button>
                <button onClick={upvote} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-l focus:outline-none focus:shadow-outline">
                    upvote
                </button>
            </div>
        </div>
    )));
}

export default Review
