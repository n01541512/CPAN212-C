import express from "express";  
import cors from "cors";
import save_router from "./routers/save_router.js";
import fetch_router from "./routers/fetch_router.js";

const app = express();
const PORT = process.env.PORT || 8000;
 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
 

app.get("/", (req, res) => {
  res.send("Welcome to our server");
});
 
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
 
app.use("", (req, res) => {
  res.status(404).send("Page not found");
});
 
