const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  duration: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  skills: [String]
});

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [String],
  features: [String],
  github: { type: String },
  liveDemo: { type: String },
  image: { type: String }
});

const educationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  duration: { type: String, required: true },
  grade: { type: String },
  relevantCourses: [String],
  stream: { type: String }
});

const skillsSchema = new mongoose.Schema({
  frontend: [String],
  backend: [String],
  tools: [String],
  languages: [String]
});

const languageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  proficiency: { type: String, required: true }
});

const portfolioSchema = new mongoose.Schema({
  personal: {
    name: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    location: { type: String },
    resumeLink: { type: String },
    github: { type: String },
    linkedin: { type: String },
    bio: { type: String, required: true }
  },
  experience: [experienceSchema],
  projects: [projectSchema],
  education: [educationSchema],
  skills: skillsSchema,
  languages: [languageSchema],
  interests: [String]
}, {
  timestamps: true
});

module.exports = mongoose.model('Portfolio', portfolioSchema);