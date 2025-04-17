import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products/featured')
      .then(res => setFeatured(res.data))
      .catch(err => console.error('Failed to load featured products:', err));
  }, []);

  return (
    <div className="home">
      <section className="hero">
        <h1>Discover the Latest in Tech</h1>
        <p>From smartphones to smartwatches, we’ve got you covered.</p>
        <Link to="/shop" className="btn">Shop Now</Link>
      </section>

      <section className="featured">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {featured.map(product => (
            <Link to={`/product/${product._id}`} key={product._id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h4>{product.name}</h4>
              <p>${product.price}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="categories">
        <h2>Browse by Category</h2>
        <div className="category-grid">
          <Link to="/shop?category=Laptops" className="category-tile">Laptops</Link>
          <Link to="/shop?category=Phones" className="category-tile">Phones</Link>
          <Link to="/shop?category=Headphones" className="category-tile">Headphones</Link>
          <Link to="/shop?category=Accessories" className="category-tile">Accessories</Link>
        </div>
      </section>

      <section className="newsletter">
        <h3>Get the Latest Deals</h3>
        <input type="email" placeholder="Enter your email" />
        <button>Subscribe</button>
      </section>
    </div>
  );
};

export default Home;
