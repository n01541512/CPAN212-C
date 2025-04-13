import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewTicket = () => {
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, status: 'open' })
    });
    navigate('/tickets');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a New Ticket</h2>
      <input
        type="text"
        value={title}
        placeholder="Ticket title"
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default NewTicket;
