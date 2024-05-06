import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


export function Buy() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);

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

    // Handle checkbox change
    const handleCheckboxChange = (productId) => {
        const isChecked = selectedProducts.includes(productId);
        if (isChecked) {
            setSelectedProducts(selectedProducts.filter(id => id !== productId));
        } else {
            setSelectedProducts([...selectedProducts, productId]);
        }
    };

    // Handle buy action
    const handleBuy = () => {
        // Perform actions based on selectedProducts
        console.log('Selected products:', selectedProducts);
        
    };

    return (
        <div>
            <h1>Buy Products</h1>
            <button onClick={handleBuy}>Buy Selected</button>
            <div className="product-cards">
                {products.map(product => (
                    <div className="product-card" key={product.id}>
                        <h2>{product.title}</h2>
                        <p>{product.description}</p>
                        <p>Price: {product.priceInWei} Wei</p>
                        <input
                            type="checkbox"
                            checked={selectedProducts.includes(product.id)}
                            onChange={() => handleCheckboxChange(product.id)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
