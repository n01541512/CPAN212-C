import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const upload_directory = path.join(__dirname, "../uploads");

router.get("/single", (req, res) => {
  let files_array = fs.readdirSync(upload_directory);
  if (files_array.length == 0) {
    return res.status(503).json({ message: "No images available" });
  }

  let filename = files_array[Math.floor(Math.random() * files_array.length)];
  res.sendFile(path.join(upload_directory, filename));  // Serve the random file
});

router.get("/multiple", (req, res) => {
  let files_array = fs.readdirSync(upload_directory);
  if (files_array.length == 0) {
    return res.status(503).json({ message: "No images available" });
  }

  let selectedFiles = [];
  for (let i = 0; i < 3; i++) {
    let filename = files_array[Math.floor(Math.random() * files_array.length)];
    selectedFiles.push(filename);
  }

  res.json({ files: selectedFiles });
});

router.get("/file/:filename", (req, res) => {
  res.sendFile(path.join(__dirname, "../uploads", req.params.filename));
});

export default router;
