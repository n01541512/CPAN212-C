const { getAllTickets, getTicketById, createTicket } = require('../models/ticketModel');
  
  const getTickets = (req, res) => {
    res.json(getAllTickets());
  };
  
  const getTicket = (req, res) => {
    const ticket = getTicketById(req.params.id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    res.json(ticket);
  };
  
  const postTicket = (req, res) => {
    const { title, status } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });
    const newTicket = createTicket({ title, status });
    res.status(201).json(newTicket);
  };
  
  module.exports = {
    getTickets,
    getTicket,
    postTicket
  };
  