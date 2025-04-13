import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const TicketDetail = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    fetch(`/api/tickets/${id}`)
      .then(res => res.json())
      .then(data => setTicket(data));
  }, [id]);

  if (!ticket) return <p>Loading...</p>;

  return (
    <div>
      <h2>{ticket.title}</h2>
      <p>Status: {ticket.status}</p>
    </div>
  );
};

export default TicketDetail;
