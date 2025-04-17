import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`/api/orders/${id}`);
        setOrder(res.data);
      } catch (err) {
        console.error('Error loading order detail', err);
      }
    };

    fetchOrder();
  }, [id]);

  if (!order) return <p>Loading...</p>;

  return (
    <div className="order-detail">
      <h2>Order {order._id}</h2>
      <p><strong>Status:</strong> {order.isDelivered ? 'Delivered' : 'In Progress'}</p>
      <h3>Shipping</h3>
      <p>{order.shippingAddress.fullName}</p>
      <p>{order.shippingAddress.address}, {order.shippingAddress.city}</p>

      <h3>Payment</h3>
      <p><strong>Method:</strong> {order.paymentMethod}</p>
      <p><strong>Paid:</strong> {order.isPaid ? '✅ Yes' : '❌ No'}</p>

      <h3>Items</h3>
      <ul>
        {order.orderItems.map(item => (
          <li key={item.product}>
            {item.name} × {item.qty} — ${item.price}
          </li>
        ))}
      </ul>

      <h3>Order Summary</h3>
      <p>Items: ${order.itemsPrice.toFixed(2)}</p>
      <p>Shipping: ${order.shippingPrice.toFixed(2)}</p>
      <p>Tax: ${order.taxPrice.toFixed(2)}</p>
      <p><strong>Total: ${order.totalPrice.toFixed(2)}</strong></p>
    </div>
  );
};

export default OrderDetail;
