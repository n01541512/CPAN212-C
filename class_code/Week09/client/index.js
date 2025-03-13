import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import book_router from "./routers/book_router.js"

//declaration of variables
const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

// routes
app.use("/book", book_router)

//start server
mongoose.connect('mongodb+srv://madkay2004:RAosRX0VM6AeUXsc@cluster0.yqlnx.mongodb.net/')
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () =>
            console.log(`Server running on http://localhost:${PORT}`)
        );
    })
    .catch((error) => console.error("MongoDB connection error:", error)
);
