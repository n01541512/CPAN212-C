import express from "express";
import cors from "cors";  // Add this import
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })


const app = express();
const PORT = process.env.PORT || 8000;

// middleware
app.use(cors());  // CORS middleware
app.use(express.urlencoded({ extended: true })); // Plain HTML FORMS
app.use(express.json()); // accepts JSON DATA

// routes
app.get("/", (req, res) => {
  res.send("Welcome to our server");
});

app.get("/data", (req, res) => {
  res.json({
    name: "Adel",
    password: "Blahgriphy345$",
    username: "Adelali"
  });
});

app.post("/login", (req, res) => {
  console.log(req.body);
  res.json("I got your information");
});

// 404 Error Handling Middleware - Should be placed at the end
app.use((req, res) => {
  res.status(404).send("Page not found");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
