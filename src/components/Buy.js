import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Buy() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    // Load product data from JSON file
    useEffect(() => {
        fetch('products.json')
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            })
            .catch(error => {
                console.error('Error loading product data:', error);
            });
    }, []);

    // Handle buy action
    const handleBuy = (productId) => {
        // Remove the product from the list
        const updatedProducts = products.filter(product => product.id !== productId);
        setProducts(updatedProducts);

    };

    return (
        <div>
            <h1>Buy Products</h1>
            {products.map(product => (
                <div key={product.id}>
                    <h2>{product.title}</h2>
                    <p>{product.description}</p>
                    <p>Price: {product.price}</p>
                    <button onClick={() => handleBuy(product.id)}>Buy ◉Θ◉</button>
                </div>
            ))}
        </div>
    );
}
