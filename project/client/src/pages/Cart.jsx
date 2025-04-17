import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext'; 

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <h2>Your Cart is Empty 🛒</h2>
        <Link to="/shop" className="btn">Go Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      <div className="cart-list">
        {cartItems.map(item => (
          <div className="cart-item" key={item._id}>
            <img src={item.image} alt={item.name} width="80" />
            <div className="info">
              <Link to={`/product/${item._id}`}>{item.name}</Link>
              <p>${item.price.toFixed(2)}</p>
              <input
                type="number"
                min="1"
                max={item.countInStock}
                value={item.qty}
                onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
              />
              <button onClick={() => removeFromCart(item._id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Subtotal: ${total}</h3>
        <button onClick={handleCheckout} className="btn-checkout">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
