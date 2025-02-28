import express from "express";
import upload from "../middleware/multer.js";  
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const upload_directory = path.join(__dirname, "../uploads");

router.post("/single", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  res.json({
    message: "File uploaded successfully",
    file: `/uploads/${req.file.filename}`,
  });
});

router.post("/multiple", upload.array("files", 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No files uploaded" });
  }

  res.json({
    message: "Files uploaded successfully",
    files: req.files.map(file => `/uploads/${file.filename}`),
  });
});

router.get("/multiple", (req, res) => {
  let files_array = fs.readdirSync(upload_directory);
  if (files_array.length === 0) {
    return res.status(503).json({ message: "No images available" });
  }

  let selectedFiles = [];
  for (let i = 0; i < 3; i++) {
    let filename = files_array[Math.floor(Math.random() * files_array.length)];
    selectedFiles.push(filename);
  }

  res.json({ files: selectedFiles });
});

export default router;
