import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const [shipping, setShipping] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShipping({ ...shipping, [name]: value });
  };

  const handlePlaceOrder = () => {
    console.log('Order placed:', {
      shipping,
      paymentMethod,
      items: cartItems,
      total,
    });

    navigate('/order-success'); 
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>

      <div className="checkout-content">
        <div className="form-section">
          <h3>Shipping Address</h3>
          <input name="fullName" placeholder="Full Name" value={shipping.fullName} onChange={handleInputChange} />
          <input name="address" placeholder="Address" value={shipping.address} onChange={handleInputChange} />
          <input name="city" placeholder="City" value={shipping.city} onChange={handleInputChange} />
          <input name="postalCode" placeholder="Postal Code" value={shipping.postalCode} onChange={handleInputChange} />
          <input name="country" placeholder="Country" value={shipping.country} onChange={handleInputChange} />
        </div>

        <div className="form-section">
          <h3>Payment Method</h3>
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option>Credit Card</option>
            <option>PayPal</option>
            <option>Apple Pay</option>
          </select>
        </div>

        <div className="summary-section">
          <h3>Order Summary</h3>
          {cartItems.map(item => (
            <div key={item._id} className="summary-item">
              <p>{item.name} x {item.qty}</p>
              <p>${(item.price * item.qty).toFixed(2)}</p>
            </div>
          ))}
          <h4>Total: ${total}</h4>

          <button onClick={handlePlaceOrder} className="btn-place-order">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
