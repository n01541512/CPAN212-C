let tickets = [ { id: 1, title: 'Login issue', status: 'open' },
    { id: 2, title: 'Payment not processing', status: 'closed' }
  ];
  
  const getAllTickets = () => tickets;
  
  const getTicketById = (id) => tickets.find(ticket => ticket.id === parseInt(id));
  
  const createTicket = ({ title, status }) => {
    const newTicket = {
      id: tickets.length + 1,
      title,
      status: status || 'open'
    };
    tickets.push(newTicket);
    return newTicket;
  };
  
  module.exports = {
    getAllTickets,
    getTicketById,
    createTicket
  };
  