import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Web3 from 'web3';

const OxygenButtons = styled.button`
    @import url("https://fonts.googleapis.com/css2?family=Oxygen:wght@300;400;700&display=swap");
    background-color: #967bb6;
    font-family: "Oxygen", sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 25px;
    margin: 0px 50px;
    padding: 20px 20px;
    color: white;
    border: none;
    cursor: pointer;

    &:hover {
        background-color: #7f5d9e;
    }
`;

export function Welcome() {
    const navigate = useNavigate();

    async function handleConnectWallet() {
        try {
            // Check if MetaMask is installed
            if (window.ethereum) {
                // Request access
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                console.log("Wallet connected:", window.ethereum.selectedAddress);
            } else {
                // no metamask
                console.error("MetaMask is not installed.");
            }
        } catch (error) {
            // Error handling
            console.error("Error connecting to MetaMask wallet:", error);
        }
    }
	// methods below used in other pages
    async function handleBuyProduct() {
        try {
            const web3 = new Web3(window.ethereum);
            const contractAddress = "0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8"; 
            const contract = new web3.eth.Contract(abi, contractAddress);
            const productId = 1;
            await contract.methods.purchaseProduct(productId)
                .send({ from: window.ethereum.selectedAddress, value: web3.utils.toWei('0.0001', 'ether') });
            console.log("Product purchased successfully.");
        } catch (error) {
            console.error("Error purchasing product:", error);
        }
    }

    async function handleSellProduct() {
        try {
            const web3 = new Web3(window.ethereum);
            const contractAddress = "0x4d8633013339c23f3af236c5dcb60aacbff4e1f4"; 
            const contract = new web3.eth.Contract(abi, contractAddress);
            const title = "My Product";
            const description = "Product Description";
            const priceInSepoliaEth = 1;
            await contract.methods.createProduct(title, description, priceInSepoliaEth)
                .send({ from: window.ethereum.selectedAddress, value: web3.utils.toWei('0.001', 'ether') });
            console.log("Product listed successfully.");
        } catch (error) {
            console.error("Error listing product:", error);
        }
    }
// reroute user
    function navBuyItems() {
        navigate('/buyproduct');
    }

    function navSellItems() {
        navigate('/sellproduct');
    }

    return (
        <div className="welcomePage" style={{ backgroundImage: "url(/../sunset.jpg)" }}>
            <div className="container-test">
                <h1> Welcome to DApp Store ✿◡‿◡</h1>
            </div>
            <div className="container">
                <OxygenButtons onClick={handleConnectWallet}>Connect Wallet</OxygenButtons>
                <OxygenButtons id="buyproduct" onClick={navBuyItems}>Buy Product</OxygenButtons>
                <OxygenButtons id="sellproduct" onClick={navSellItems}>Sell Product</OxygenButtons>
            </div>
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
