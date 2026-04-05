const verifyAdmin = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const validToken = Buffer.from(
    `${process.env.ADMIN_EMAIL}:${process.env.ADMIN_PASSWORD}`
  ).toString('base64');

  if (token !== `Basic ${validToken}`) {
    return res.status(403).json({ message: 'Invalid credentials.' });
  }

  next();
};

module.exports = verifyAdmin;
