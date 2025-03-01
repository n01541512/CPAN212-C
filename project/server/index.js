import express from 'express';
import cors from 'cors';
import path from 'path';

const app = express();
const port = 5000;

app.use(cors());

app.use(express.static(path.join(process.cwd(), 'client/build')));

const homepageData = {
  hero: {
    image: 'hero-image-url.jpg',
    heading: 'Shop the Best Deals of the Season!',
    subheading: 'Discover exclusive offers on top brands.',
    promoText: 'Up to 50% off on select items. Limited time only!'
  },
  categories: [
    { name: 'Electronics', products: [{ name: 'Smartphone', image: 'smartphone-image-url.jpg' }, { name: 'Laptop', image: 'laptop-image-url.jpg' }] },
    { name: 'Fashion', products: [{ name: 'Men\'s Jacket', image: 'jacket-image-url.jpg' }, { name: 'Women\'s Dresses', image: 'dress-image-url.jpg' }] },
    { name: 'Home & Kitchen', products: [{ name: 'Blender', image: 'blender-image-url.jpg' }, { name: 'Microwave', image: 'microwave-image-url.jpg' }] },
    { name: 'Sports & Outdoors', products: [{ name: 'Yoga Mat', image: 'yoga-mat-image-url.jpg' }, { name: 'Hiking Boots', image: 'boots-image-url.jpg' }] }
  ],
  featuredProducts: [
    { name: 'Wireless Headphones', price: '$99.99', rating: '⭐⭐⭐⭐☆', description: 'Noise-cancelling wireless headphones for superior sound quality.', image: 'headphones-image-url.jpg' },
    { name: 'Men\'s Leather Jacket', price: '$149.99', rating: '⭐⭐⭐⭐⭐', description: 'Premium quality leather jacket available in multiple sizes.', image: 'jacket-image-url.jpg' },
    { name: 'Stainless Steel Blender', price: '$59.99', rating: '⭐⭐⭐⭐☆', description: 'Blend smoothies and more with this powerful stainless steel blender.', image: 'blender-image-url.jpg' }
  ],
  bestSellers: [
    { name: 'Bluetooth Speaker', price: '$39.99' },
    { name: 'Portable Charger', price: '$19.99' },
    { name: 'Smartwatch', price: '$89.99' },
    { name: 'Fitness Tracker', price: '$49.99' }
  ],
  testimonials: [
    { name: 'Emily R.', text: 'I love the quality of the products. Fast shipping too!' },
    { name: 'John D.', text: 'Great customer service and the products are exactly as described.' },
    { name: 'Sarah L.', text: 'The best shopping experience I\'ve ever had. Will shop again!' }
  ],
  promotions: [
    { text: 'Sign up and get 10% off your first order!' },
    { text: 'Buy 2, Get 1 Free on all accessories.' },
    { text: 'Free shipping on orders over $50.' }
  ]
};

app.get('/api/homepage', (req, res) => {
  res.json(homepageData);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'client/build/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
