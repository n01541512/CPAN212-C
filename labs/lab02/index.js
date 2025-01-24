import express from 'express';
import labRouter from './router/lab_router.js';

const app = express();
const PORT = process.env.PORT || 9000;

app.use("/lab", labRouter);

app.get("/", (req, res) => {
    res.send("Welcome to the Server")
})

app.listen(PORT, ()=>{
    console.log(`https://localhost:${PORT}`)
})