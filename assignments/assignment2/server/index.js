const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const recipesRouter = require('./routes/recipes_router');

const app = express();

app.use(cors());

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/recipeDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

app.use('/recipe', recipesRouter);

app.listen(8001, () => {
  console.log('Server is running on http://localhost:8001');
});
