import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';

export function Sell() {
    const navigate = useNavigate();

    // State variables for title, description, and price
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    // Load product data from JSON file
    useEffect(() => {
        fetch('products.json')
            .then(response => response.json())
            .then(data => {
                console.log('Product data:', data);
                
            })
            .catch(error => {
                console.error('Error loading product data:', error);
            });
    }, []); 

    // Handle changes in the input fields
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    // Handle the sell action
    const handleSell = async () => {
        
        const priceInWei = Web3.utils.toWei(price, 'ether');

        // Create product object
        const product = {
            title: title,
            description: description,
            priceInWei: priceInWei
        };

        // Store product data as JSON or send it to backend
        console.log("Product listed:", product);

        // Navigate back to welcome page
        navigate('/');
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
        </div>
    );
}
