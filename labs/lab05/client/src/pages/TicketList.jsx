import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch('/api/tickets')
      .then(res => res.json())
      .then(data => setTickets(data));
  }, []);

  return (
    <div>
      <h2>All Tickets</h2>
      <ul>
        {tickets.map(ticket => (
          <li key={ticket.id}>
            <Link to={`/tickets/${ticket.id}`}>
              {ticket.title} - {ticket.status}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketList;
