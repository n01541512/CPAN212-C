const express = require('express');
const logger = require('middleware'/'logger.js');
const auth = require('middleware'/'auth.js')
const app = express();
const PORT = process.env.PORT || 8000;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger);

// routes
app.get("/profile", logger, auth, (req, res,) => {
    res.send("Welcome to your Profile page Adek");
});

app.get("/01", (req, res) => {
    logger(req)
    res.send("Welcome to our server - 01");
});

app.get("/02", (req, res) => {
    logger(req)
    res.send("Welcome to our server - 02");
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

app.use("", (req, res) => {
    res.status(404).send("Page not found");
});

