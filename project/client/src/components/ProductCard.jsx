import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card border p-4 rounded shadow hover:shadow-lg">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
        <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
      </Link>
      <p className="text-gray-700">${product.price.toFixed(2)}</p>
      <Link
        to={`/product/${product._id}`}
        className="block text-center mt-2 bg-blue-600 text-white py-1 rounded hover:bg-blue-700"
      >
        View
      </Link>
    </div>
  );
};

export default ProductCard;
