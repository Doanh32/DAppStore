import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import productsData from './products.json'; // Import JSON data

export function Buy() {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [confirmationHash, setConfirmationHash] = useState('');

    useEffect(() => {
        // products from json file
        setProducts(productsData);
    }, []);

    const handleCheckboxChange = (productId) => {
        const isChecked = selectedProducts.includes(productId);
        if (isChecked) {
            setSelectedProducts(selectedProducts.filter(id => id !== productId));
        } else {
            setSelectedProducts([...selectedProducts, productId]);
        }
    };
    // allow users to buy
    const handleBuy = async () => {
        try {
            const web3 = new Web3(window.ethereum);
            const accounts = await web3.eth.getAccounts();

            for (const productId of selectedProducts) {
                const product = products.find(p => p.id === productId);
                if (product) {
                    const contractAddress = "0x4d8633013339c23f3af236c5dcb60aacbff4e1f4"; 
                    const contract = new web3.eth.Contract(abi, contractAddress);
                    const transaction = await contract.methods.purchaseProduct(product.id)
                        .send({ from: accounts[0], value: web3.utils.toWei(product.priceInEth.toString(), 'ether') });
                    console.log(`Transaction hash for product "${product.title}": ${transaction.transactionHash}`);
                    setConfirmationHash(transaction.transactionHash); // Set confirmation hash
                }
            }

            console.log('Products purchased successfully.');
        } catch (error) {
            console.error('Error purchasing products:', error);
        }
    };

    return (
        <div>
            <h1>Buy Products</h1>
            <button onClick={handleBuy}>Buy Selected  •̀ ω •́ ✧</button>
            <div className="product-cards">
                {products.map(product => (
                    <div className="product-card" key={product.id}>
                        <h2>{product.title}</h2>
                        <p>{product.description}</p>
                        <p>Price: {product.priceInEth} ETH</p>
                        <input
                            type="checkbox"
                            checked={selectedProducts.includes(product.id)}
                            onChange={() => handleCheckboxChange(product.id)}
                        />
                    </div>
                ))}
            </div>
            {confirmationHash && <p>Transaction confirmed with hash: {confirmationHash}</p>}
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
