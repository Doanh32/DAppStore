import React from 'react';

export function ButtonList({ jsonData }) {
    // Map over the JSON array and render each element as a button
    const renderButtons = () => {
        return jsonData.map((item) => (
            <button key={item.id}>{item.name}</button>
        ));
    };

    return (
        <div>
            <h2>Products</h2>
            <div>
                {renderButtons()}
            </div>
        </div>
    );
}
