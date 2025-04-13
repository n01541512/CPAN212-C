const express = require('express');
const router = express.Router();
const { getTickets, getTicket, postTicket } = require('../controllers/ticketController');

router.get('/', getTickets);
router.get('/:id', getTicket);
router.post('/', postTicket);

module.exports = router;
