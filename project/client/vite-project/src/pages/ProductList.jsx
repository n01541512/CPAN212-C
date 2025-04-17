import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Failed to fetch products', err));
  }, []);

  return (
    <div className="product-list">
      <h2>Tech Products</h2>
      <div className="products-grid">
        {products.map(product => (
          <div key={product._id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h4>{product.name}</h4>
            <p>${product.price}</p>
            <Link to={`/product/${product._id}`}>View</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;