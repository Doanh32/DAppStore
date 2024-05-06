import Web3 from 'web3';

// connect to MetaMask wallet
export async function connectToWallet() {
    try {
        // if MetaMask is installed
        if (window.ethereum) {
            // Request account access
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            
            // Connect wallet
            const web3 = new Web3(window.ethereum);
            const accounts = await web3.eth.getAccounts();
            const address = accounts[0];
            
            // Notify
            alert(`Connected to MetaMask wallet\nAddress: ${address}`);
            
            return address;
        } else {
            
            alert('MetaMask is not installed.');
        }
    } catch (error) {
        // Error connecting to wallet
        alert(`Error connecting to MetaMask wallet: ${error.message}`);
    }
}
