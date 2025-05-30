import express from 'express';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(cors()); 

const resumeData = {
  personalInfo: {
    name: "Adel Ali",
    title: "Computer Programmer",
    email: "adel.ali@gmail.com",
    phone: "+1 234 567 890"
  },
  skills: [
    "JavaScript",
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "HTML/CSS"
  ],
  education: [
    {
      degree: "BSc Computer Science",
      institution: "Humber College",
      year: "2022-2025"
    }
  ],
  experience: [
    {
      company: "Example Corp",
      role: "Software Engineer",
      duration: "2022 - Present",
      responsibilities: [
        "Developed web applications using React and Node.js.",
        "Collaborated with the design team to improve user interface."
      ]
    }
  ]
};

app.get('/', (req, res) => {
  res.send('Welcome to the Resume API! Visit /resume for the resume data.');
});

app.get('/resume', (req, res) => {
  res.json(resumeData);  
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
