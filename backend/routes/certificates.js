const express = require('express');
const router = express.Router();
const Certificate = require('../models/Certificate');
const verifyAdmin = require('../middleware/auth');

// GET all certificates — public
router.get('/', async (req, res) => {
  try {
    const certs = await Certificate.find();
    res.json(certs);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// POST new certificate — admin only
router.post('/', verifyAdmin, async (req, res) => {
  try {
    const { title, issuer, date, imageUrl } = req.body;

    if (!title || !issuer || !date || !imageUrl) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const cert = new Certificate({ title, issuer, date, imageUrl });
    const saved = await cert.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// DELETE certificate — admin only
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const deleted = await Certificate.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Certificate not found.' });
    res.json({ message: 'Certificate deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
