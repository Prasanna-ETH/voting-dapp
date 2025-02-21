const contractAddress = "0x2bbc1de38583f5013caa82d903fc9f2784dbc346"; // Replace with your contract address
const contractABI = [ 
    {
        "inputs": [
            { "internalType": "string[]", "name": "_candidateName", "type": "string[]" }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "_candidateId", "type": "uint256" }
        ],
        "name": "getVoteCount",
        "outputs": [
            { "internalType": "uint256", "name": "", "type": "uint256" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "_candidateId", "type": "uint256" }
        ],
        "name": "vote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

let web3;
let contract;

window.addEventListener("load", async () => {
    if (window.ethereum) {
        try {
            web3 = new Web3(window.ethereum);
            await window.ethereum.request({ method: "eth_requestAccounts" });
            contract = new web3.eth.Contract(contractABI, contractAddress);
            console.log("Connected to contract:", contract);
        } catch (error) {
            console.error("Error connecting to MetaMask:", error);
            alert("Failed to connect to MetaMask. Please try again.");
        }
    } else {
        alert("MetaMask not detected. Please install it.");
    }
});

async function vote() {
    try {
        const candidateId = document.getElementById("candidateId").value;
        if (!candidateId) {
            alert("Please enter a Candidate ID.");
            return;
        }

        const accounts = await web3.eth.getAccounts();
        await contract.methods.vote(candidateId).send({ from: accounts[0] });
        alert("Voted successfully!");
    } catch (error) {
        console.error("Voting error:", error);
        alert("Error while voting. Check the console for details.");
    }
}

async function getVoteCount() {
    try {
        const candidateId = document.getElementById("voteCountId").value;
        if (!candidateId) {
            alert("Please enter a Candidate ID.");
            return;
        }

        const result = await contract.methods.getVoteCount(candidateId).call();
        document.getElementById("voteResult").innerText = `Vote Count: ${result}`;
    } catch (error) {
        console.error("Error fetching vote count:", error);
        alert("Failed to retrieve vote count. See console for details.");
    }
}
