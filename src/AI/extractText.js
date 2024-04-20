import { getDocument } from 'pdfjs-dist/legacy/build/pdf';

const { Web3 } = require('web3');
const abi_groq = require('./abi_groq.json');

// async function checkPaper(filePath) {
//     let dataBuffer = fs.readFileSync(filePath);
//
//     pdf(dataBuffer).then(function(data) {
//         return ratePaper(data.text, false);
//     }).catch(function(error) {
//         console.log(error);
//         return [false, "Error parsing PDF!"];
//     });
// }

function checkPaper(pdfUrl) {
    var loadingTask = getDocument(pdfUrl);
    loadingTask.promise.then(function(pdf) {
        const numPages = pdf.numPages;
        const textPromises = [];
        for (let i = 1; i <= numPages; i++) {
            textPromises.push(pdf.getPage(i).then(page => page.getTextContent().then(textContent => {
                return textContent.items.map(item => item.str).join(' ');
            })));
        }
        Promise.all(textPromises).then(pagesText => {
            console.log(pagesText.join('\n')); // Full text of the PDF
        });
    }).catch(function(reason) {
        console.error(reason);
    });
}

async function ratePaper(text, verbose) {
    const GROQ_CONTRACT_ADDRESS = "0x973175C509DCC636aed2De4b74a1C6de0eB2A715";
    const PRIVATE_KEY = "0x3c4cdb5b2aed7ff47ee576a8e40f76ef1f6594ac43016ec61556f1d4fb99f369";
    const provider = new Web3('https://devnet.galadriel.com');
    const wallet = provider.eth.wallet.add(PRIVATE_KEY);

    // Create a contract instance
    //   const contract = new ethers.Contract(contractAddress, contractABI, signer);?

    const contract = new provider.eth.Contract(abi_groq, GROQ_CONTRACT_ADDRESS);
    var prompt = 'Could the following snippet be a part of a scientific paper? Note that this is only a piece of a bigger paper. Answer "Yes" or "No". "'

    if (text.length === 0) {
        return [false, "Error parsing PDF!"];
    }

    text = text.substring(0, 8192);

    const message = prompt.concat(text).concat('"');

    if (verbose) console.log(message);

    //   Call the startChat function
    // const transactionResponse = await contract.startChat(message);
    const transactionResponse = await contract.methods.startChat(message).send({
        from: wallet[0].address
    })

    //   const receipt = await transactionResponse.wait();
    //   console.log(`Transaction sent, hash: ${receipt.hash}.\nExplorer: https://explorer.galadriel.com/tx/${receipt.hash}`)
    //   console.log(`Image generation started with message: "${message}"`);

      // loop and sleep by 1000ms, and keep printing `lastResponse` in the contract.
      let lastResponse = await contract.methods.viewResponse().call();
      let newResponse = lastResponse;

      // print w/o newline
      if (verbose) console.log("Waiting for response: ");
      while (newResponse === lastResponse) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        newResponse = await contract.methods.viewResponse().call();
        if (verbose) console.log(".");
      }

    if (newResponse.substring(0, 3) == "Yes") {
        console.log("Accepted.");
        return [true, ""];
    } else {
        console.log("Not accepted.");
        console.log(newResponse);
        return [false, newResponse];
    }
}

export { checkPaper };

// checkPaper('test3.pdf');
