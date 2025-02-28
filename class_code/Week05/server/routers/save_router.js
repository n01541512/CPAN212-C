import express from "express";
import upload from "../middleware/multer.js";  

const router = express.Router();

router.post("/single", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  res.json({
    message: "Image uploaded successfully",
    filePath: `/uploads/${req.file.filename}`,
  });
});

router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(500).json({ error: err.message });
  } else {
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
