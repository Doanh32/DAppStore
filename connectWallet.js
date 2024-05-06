import Web3 from "web3";

// Check if MetaMask is installed and enabled
if (window.ethereum) {
    const web3 = new Web3(window.ethereum);

    // Request account access if needed
    window.ethereum.enable().then(function(accounts) {
        // Interacting with the smart contract
        const abi = [
            // Paste your ABI here
        ];

        const address = "0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8";

        // Create a new contract object, providing the ABI and address
        const contract = new web3.eth.Contract(abi, address);

        // Example usage:
        // Call the `createProduct` function
        contract.methods.createProduct("My Product", "Product Description", 100)
            .send({ from: accounts[0], value: web3.utils.toWei('0.001', 'ether') }) // Example of sending ether with the transaction
            .on('receipt', function(receipt){
                console.log("Transaction receipt:", receipt);
            })
            .on('error', function(error){
                console.error("Transaction error:", error);
            });

        // Call the `purchaseProduct` function
        contract.methods.purchaseProduct(1)
            .send({ from: accounts[0], value: web3.utils.toWei('0.0001', 'ether') }) // Example of sending ether with the transaction
            .on('receipt', function(receipt){
                console.log("Transaction receipt:", receipt);
            })
            .on('error', function(error){
                console.error("Transaction error:", error);
            });

        // Call the `name` function
        contract.methods.name().call().then(function(result){
            console.log("Contract name:", result);
        }).catch(function(error){
            console.error("Error calling name function:", error);
        });

        // Call the `productCount` function
        contract.methods.productCount().call().then(function(result){
            console.log("Product count:", result);
        }).catch(function(error){
            console.error("Error calling productCount function:", error);
        });
    }).catch(function(error) {
        // User denied account access
        console.error("User denied account access:", error);
    });
} else {
    // MetaMask is not installed
    console.error("MetaMask is not installed.");
}
