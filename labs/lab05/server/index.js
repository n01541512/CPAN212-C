const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const ticketRoutes = require('./routes/ticketRoutes');

const app = express();
const PORT = 5000;
const MONGO_URI = 'mongodb://localhost:27017/ticketing-app'; // or your MongoDB Atlas URI

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

app.use('/api/tickets', ticketRoutes);
