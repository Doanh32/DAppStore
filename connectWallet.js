import Web3 from "web3";

// Check if MetaMask is installed and enabled
if (window.ethereum) {
    const web3 = new Web3(window.ethereum);

    // Request account access if needed
    window.ethereum.enable().then(function(accounts) {
        // Interacting with the smart contract
        const abi = [
            {
                "inputs": [],
                "name": "createProduct",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "_title",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "_description",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_priceInSepoliaEth",
                        "type": "uint256"
                    }
                ],
                "name": "createProduct",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "name",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_id",
                        "type": "uint256"
                    }
                ],
                "name": "purchaseProduct",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "title",
                        "type": "string"
                    },
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "description",
                        "type": "string"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "priceInSepoliaEth",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "bool",
                        "name": "purchased",
                        "type": "bool"
                    }
                ],
                "name": "ProductCreated",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "title",
                        "type": "string"
                    },
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "description",
                        "type": "string"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "bool",
                        "name": "purchased",
                        "type": "bool"
                    }
                ],
                "name": "ProductPurchased",
                "type": "event"
            }
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
