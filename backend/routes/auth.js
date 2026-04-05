const express = require('express');
const router = express.Router();

// POST /api/auth/login — validates admin credentials and returns a token
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = Buffer.from(`${email}:${password}`).toString('base64');
    return res.json({ token: `Basic ${token}`, message: 'Login successful' });
  }

  return res.status(401).json({ message: 'Invalid email or password.' });
});

module.exports = router;
