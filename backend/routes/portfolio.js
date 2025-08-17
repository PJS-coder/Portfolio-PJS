const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');

// Get portfolio data
router.get('/', async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    
    // If no portfolio exists, create one with default data
    if (!portfolio) {
      portfolio = new Portfolio({
        personal: {
          name: "Prabhjot Singh",
          title: "Aspiring Full-Stack Developer",
          subtitle: "2nd Year BCA Student | MERN Stack Developer",
          email: "pjs89079@gmail.com",
          // phone: "None",
          location: "New Delhi, India",
          resumeLink: "https://drive.google.com/file/d/15fu27LIUUJzcttVpXVsMDcaiXhXShbib/view?usp=sharing",
          github: "https://github.com/PJS-coder",
          linkedin: "https://www.linkedin.com/in/prabhjot-singh-pjs-885374314/",
          bio: "Aspiring full-stack developer with hands-on experience in MERN stack. Currently pursuing BCA (2nd Year) at Lingaya's Vidyapeeth. Completed real-world projects like an Airbnb Clone and interning as a Web Developer at Trackila Smart Innovations Pvt. Ltd."
        },
        experience: [
          {
            title: "Web Developer Intern",
            company: "Trackila Smart Innovations Pvt. Ltd.",
            duration: "July 2025 - Present",
            location: "Remote",
            description: "Collaborated on building full-stack web applications. Worked on backend APIs using Node.js and Express.js. Contributed to real-time features and MongoDB database operations.",
            skills: ["Node.js", "Express.js", "MongoDB", "REST APIs", "Full-Stack Development"]
          }
        ],
        projects: [
          {
            title: "Airbnb Clone (Full-Stack)",
            description: "Developed a full-stack Airbnb clone enabling users to list, browse, and book properties. Implemented authentication, property dashboards, booking features, and responsive UI.",
            technologies: ["Node.js", "Express", "MongoDB", "Mongoose", "EJS", "Bootstrap", "Passport.js", "Cloudinary", "Multer", "Mapbox"],
            features: [
              "User authentication with Passport.js",
              "Property listing and management",
              "Image upload with Cloudinary",
              "Interactive maps with Mapbox",
              "Booking system and dashboards",
              "Responsive UI with Bootstrap"
            ],
            github: "https://github.com/PJS-coder/airbnb-clone",
            liveDemo: "https://airbnb-clone-pjs.onrender.com/listings",
            image: "https://lagobali.com/wp-content/uploads/2023/12/beach-house-1-scaled.jpeg"
          }
        ],
        education: [
          {
            degree: "Bachelor of Computer Applications (BCA)",
            institution: "Lingaya's Vidyapeeth",
            duration: "June 2024 - August 2027",
            grade: "2nd Year (Current)",
            relevantCourses: ["Data Structures", "Database Management", "Web Development", "Object-Oriented Programming", "Software Engineering"]
          },
          {
            degree: "Class 12th (Humanities)",
            institution: "Air Force School Jodhpur",
            duration: "July 2023 - April 2024",
            grade: "76%",
            stream: "Humanities"
          }
        ],
        skills: {
          frontend: ["HTML", "CSS", "JavaScript", "Bootstrap", "EJS"],
          backend: ["Node.js", "Express.js", "MongoDB", "Mongoose", "REST APIs", "JWT", "Passport.js"],
          tools: ["Git", "GitHub", "Cloudinary", "Multer", "Mapbox"],
          languages: ["JavaScript", "SQL", "Learning Java"]
        },
        languages: [
          { name: "English", proficiency: "Average" },
          { name: "Hindi", proficiency: "Native" },
          { name: "Punjabi", proficiency: "Native" }
        ],
        interests: ["Music", "Gaming", "Building real-world projects", "Web Development", "Full-Stack Development"]
      });
      
      await portfolio.save();
    }
    
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update portfolio data
router.put('/', async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    
    if (!portfolio) {
      portfolio = new Portfolio(req.body);
    } else {
      Object.assign(portfolio, req.body);
    }
    
    await portfolio.save();
    res.json(portfolio);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add new experience
router.post('/experience', async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne();
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    
    portfolio.experience.push(req.body);
    await portfolio.save();
    res.json(portfolio);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add new project
router.post('/projects', async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne();
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    
    portfolio.projects.push(req.body);
    await portfolio.save();
    res.json(portfolio);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;