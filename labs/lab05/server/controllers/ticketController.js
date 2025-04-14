const Ticket = require('../models/ticketModel');

const getTickets = async (req, res) => {
  const tickets = await Ticket.find();
  res.json(tickets);
};

const getTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    res.json(ticket);
  } catch (err) {
    res.status(400).json({ message: 'Invalid ID format' });
  }
};

const postTicket = async (req, res) => {
  const { title, status } = req.body;
  if (!title) return res.status(400).json({ message: 'Title is required' });

  try {
    const newTicket = new Ticket({ title, status });
    const saved = await newTicket.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create ticket' });
  }
};

module.exports = {
  getTickets,
  getTicket,
  postTicket
};
