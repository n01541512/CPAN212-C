import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userRes = await axios.get('/api/users/profile'); 
        const ordersRes = await axios.get('/api/orders/my-orders');

        setUser(userRes.data);
        setOrders(ordersRes.data);
        setFormData({ name: userRes.data.name, email: userRes.data.email });
      } catch (err) {
        console.error('Error fetching profile:', err.message);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put('/api/users/profile', formData);
      setUser(res.data);
      setEditing(false);
      alert('Profile updated!');
    } catch (err) {
      console.error('Update failed:', err.message);
    }
  };

  return (
    <div className="profile">
      <h2>My Profile</h2>

      <div className="profile-info">
        {editing ? (
          <>
            <input name="name" value={formData.name} onChange={handleChange} />
            <input name="email" value={formData.email} onChange={handleChange} />
            <button onClick={handleUpdate}>Save</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <button onClick={() => setEditing(true)}>Edit Profile</button>
          </>
        )}
      </div>

      <div className="order-history">
        <h3>My Orders</h3>
        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <ul>
            {orders.map(order => (
              <li key={order._id}>
                <p>Order ID: {order._id}</p>
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                <p>Total: ${order.totalPrice.toFixed(2)}</p>
                <p>Status: {order.isDelivered ? 'Delivered' : 'Processing'}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Profile;
