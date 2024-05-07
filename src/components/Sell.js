import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';


export function Sell() {
    const navigate = useNavigate();

    // State variables for title, description, and price
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [confirmationMessage, setConfirmationMessage] = useState('');

    // connect to web3 and testnet
    useEffect(() => {
        const initWeb3 = async () => {
            if (window.ethereum) {
                const web3Instance = new Web3(window.ethereum);
                setWeb3(web3Instance);

                try {
                    // get wallet access
                    await window.ethereum.enable();

                    // Instantiate contract
                    const contractAddress = "0x4d8633013339c23f3af236c5dcb60aacbff4e1f4"; 
                    const contractInstance = new web3Instance.eth.Contract(abi, contractAddress);
                    setContract(contractInstance);
                } catch (error) {
                    console.error('Error initializing Web3:', error);
                }
            } else {
                console.error('MetaMask is not installed.');
            }
        };

        initWeb3();
    }, []);

    // Handle changes in the input 
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    // Sell
    const handleSell = async () => {
        try {
            const priceInWei = web3.utils.toWei(price, 'ether');

            // Call smart contract to add product
            const transaction = await contract.methods.createProduct(title, description, priceInWei).send({ from: web3.eth.defaultAccount });

            // Get the transaction hash
            const transactionHash = transaction.transactionHash;

            // Confirmation message
            setConfirmationMessage(`Product listed successfully. Transaction hash: ${transactionHash}`);

            // Navigate back to welcome page after 3 seconds
            setTimeout(() => {
                navigate('/');
            }, 3000);
        } catch (error) {
            console.error('Error listing product:', error);
        }
    };

    return (
        <div>
            <h1>Sell Product</h1>
            <label>Title:</label>
            <input type="text" value={title} onChange={handleTitleChange} />

            <label>Description:</label>
            <input type="text" value={description} onChange={handleDescriptionChange} />

            <label>Price (ETH):</label>
            <input type="number" value={price} onChange={handlePriceChange} />

            <button onClick={handleSell}>List Product ❁´◡`❁</button>

            {confirmationMessage && <p>{confirmationMessage}</p>}
        </div>
    );
}

const abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
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
				"internalType": "address payable",
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
				"internalType": "address payable",
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
		"stateMutability": "nonpayable",
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
		"inputs": [],
		"name": "productCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "products",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "purchased",
				"type": "bool"
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
	}
];
