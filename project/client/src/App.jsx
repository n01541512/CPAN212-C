import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [homepageData, setHomepageData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/homepage')
      .then((response) => response.json())
      .then((data) => setHomepageData(data))
      .catch((error) => console.error('Error fetching homepage data:', error));
  }, []);

  if (!homepageData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <section className="hero">
        <img src={homepageData.hero.image} alt="Hero Banner" />
        <h1>{homepageData.hero.heading}</h1>
        <p>{homepageData.hero.subheading}</p>
        <button>Shop Now</button>
        <p className="promo-text">{homepageData.hero.promoText}</p>
      </section>
    
      {homepageData.categories.map((category, index) => (
        <section className="category" key={index}>
          <h2>{category.name}</h2>
          <div className="product-list">
            {category.products.map((product, idx) => (
              <div key={idx} className="product-item">
                <img src={product.image} alt={product.name} />
                <p>{product.name}</p>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-list">
          {homepageData.featuredProducts.map((product, index) => (
            <div key={index} className="product-item">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.price}</p>
              <p>{product.rating}</p>
              <p>{product.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="best-sellers">
        <h2>Best Sellers</h2>
        <ul>
          {homepageData.bestSellers.map((product, index) => (
            <li key={index}>{product.name} - {product.price}</li>
          ))}
        </ul>
      </section>

      <section className="testimonials">
        <h2>Customer Testimonials</h2>
        <div className="testimonial-list">
          {homepageData.testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-item">
              <p>"{testimonial.text}"</p>
              <p>- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="promotions">
        <h2>Promotions & Discounts</h2>
        <ul>
          {homepageData.promotions.map((promo, index) => (
            <li key={index}>{promo.text}</li>
          ))}
        </ul>
      </section>

      <footer>
        <ul className="quick-links">
          <li>Home</li>
          <li>Shop</li>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>FAQ</li>
        </ul>
        <div className="social-media">
          <span>Follow us on:</span>
          <ul>
            <li>Facebook</li>
            <li>Instagram</li>
            <li>Twitter</li>
            <li>Pinterest</li>
          </ul>
        </div>
        <div className="contact-info">
          <p>Email: support@ecommerce.com | Phone: +123-456-7890</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
