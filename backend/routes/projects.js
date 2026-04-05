const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const verifyAdmin = require('../middleware/auth');

// GET all projects — public
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST new project — admin only
router.post('/', verifyAdmin, async (req, res) => {
  try {
    const { title, description, techStack, imageUrl, githubLink, liveLink } = req.body;

    if (!title || !description || !techStack || !imageUrl || !githubLink) {
      return res.status(400).json({ message: 'All required fields must be provided.' });
    }

    const project = new Project({ title, description, techStack, imageUrl, githubLink, liveLink });
    const saved = await project.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// DELETE project — admin only
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Project not found.' });
    res.json({ message: 'Project deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
