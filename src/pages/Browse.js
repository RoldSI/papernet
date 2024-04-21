import ABI from "../abi_pp.json";
import {Web3} from "web3";
import React, {useState} from "react";
import {DNA} from "react-loader-spinner";

function Browse() {
    const [loading, setLoading] = useState(false);
    const [init, setInit] = useState(true);
    const [papers, setPapers] = useState();

    let web3, contract, accounts;

    async function connect() {
        //initialize injecteed provider
        web3 = new Web3(window.ethereum);

        //request accounts
        accounts = await web3.eth.requestAccounts();
    }

    async function getPapers() {
        contract = new web3.eth.Contract(ABI, "0x6169710e36a89cc2ef55D4e209dAC05BF4Ce0A48"); //initialize contract
        try {
            setLoading(true);
            const entriesFromContract = await contract.methods.getPapers().call();
            console.log(entriesFromContract);
            setPapers(entriesFromContract.map(entry => ({
                id: entry.id,
                citations: Array.isArray(entry.citations) && entry.citations.length > 0 ? entry.citations : ['no citations'],
                addresses: Array.isArray(entry.addresses) && entry.addresses.length > 0 ? entry.addresses : ['no addresses'],
                citedTotal: parseInt(entry.cited_total),
            })));
        } catch (error) {
            console.error('Error fetching papers:', error);
        }
        setLoading(false);
    }

    async function ini() {
        setLoading(true);
        setInit(false);
        await connect();
        await getPapers();
        setLoading(false);
    }

    if(loading) {
        return (
            <div className="flex flex-col justify-center items-center pt-20">
                <DNA/>
                <p>Loading Paper ...</p>
            </div>
        );
    }

    if(init) {
        return (
            <div className="flex flex-col justify-center items-center pt-20">
                <button onClick={ini} className="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    load papers
                </button>
            </div>
        )
    }

    return (
        <div className="max-w-xl mx-auto p-4 shadow-md rounded-lg bg-white flex flex-col">
            {papers && papers.map((paper, index) => (
                <div key={index} className="my-2 p-3 border rounded">
                    <div><strong>ID:</strong> {paper.id}</div>
                    <div><strong>Citations:</strong> {paper.citations.join(", ")}</div>
                    <div><strong>Authors:</strong> {paper.addresses.join(", ")}</div>
                    <div><strong>Cited Total:</strong> {paper.citedTotal}</div>
                    <div><button onClick={() => {
                        window.open(`https://ipfs.io/ipfs/${paper.id}`, '_blank', 'noopener,noreferrer');
                    }} className="text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                        link to paper
                    </button></div>
                </div>
            ))}
        </div>
    );
}

export default Browse
