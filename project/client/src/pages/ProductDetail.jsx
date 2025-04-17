import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error('Error loading product', err));
  }, [id]);

  const handleAddToCart = () => {
    console.log('Add to cart', product._id, 'Qty:', qty);
  };

  if (!product) return <p>Loading product...</p>;

  return (
    <div className="product-detail">
      <div className="images">
        <img src={product.image} alt={product.name} width="400" />
        <div className="thumbnail-row">
          {product.images && product.images.map((img, i) => (
            <img key={i} src={img} alt={`View ${i + 1}`} width="100" />
          ))}
        </div>
      </div>

      <div className="info">
        <h2>{product.name}</h2>
        <h4>{product.brand} • {product.category}</h4>
        <p>{product.description}</p>
        
        <h3>${product.price}</h3>
        <p>In stock: {product.countInStock}</p>

        <label>
          Qty:
          <input
            type="number"
            value={qty}
            min="1"
            max={product.countInStock}
            onChange={(e) => setQty(Number(e.target.value))}
          />
        </label>

        <button onClick={handleAddToCart} disabled={product.countInStock === 0}>
          Add to Cart
        </button>

        {product.specs && (
          <div className="specs">
            <h4>Specifications</h4>
            <ul>
              {Object.entries(product.specs).map(([key, value]) => (
                <li key={key}><strong>{key}:</strong> {Array.isArray(value) ? value.join(', ') : value}</li>
              ))}
            </ul>
          </div>
        )}

        {product.reviews?.length > 0 && (
          <div className="reviews">
            <h4>Reviews ({product.numReviews})</h4>
            {product.reviews.map((review, idx) => (
              <div key={idx} className="review">
                <p><strong>{review.name}</strong> – {review.rating}⭐</p>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
