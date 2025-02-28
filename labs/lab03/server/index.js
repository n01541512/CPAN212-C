import express from "express";
import cors from "cors";
import save_router from "./routers/save_router.js";
import fetch_router from "./routers/fetch_router.js";
import path from "path";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" })); // Allow frontend requests

app.use("/uploads", express.static("uploads"));

app.use("/save", save_router);
app.use("/fetch", fetch_router);

app.get("/", (req, res) => {
  res.send("Welcome to the server. Check /api-list for available routes.");
});

app.get("/api-list", (req, res) => {
  res.send({
    save_routes: ["/save/single", "/save/multiple"],
    fetch_routes: ["/fetch/single", "/fetch/file/:filename"],
  });
});

app.use((req, res) => {
  res.status(404).send(`No request for ${req.url} exists`);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
