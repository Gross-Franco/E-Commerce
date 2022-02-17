import React from 'react';
import p from '../helpers/mockProducts';

const ProductsContainer = () => {
    const { products } = p;
  return (
    <div className="products--container">
        <span>categoria:</span>
        <h2>Consolas</h2>
        <div className="products--list">
            {products.map(product => (
                <div className="product--item" key={product.SKU}>
                    <h4>{product.name}</h4>
                    <pre>{product.price}</pre>
                    <span>{product.description}</span>
                </div>
            ))}
        </div>
    </div>
  )
};

export default ProductsContainer;