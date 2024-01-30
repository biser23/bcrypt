const jwt = require('jsonwebtoken');
const config = require('../crypto/config');

function generateToken(user) {
  const payload = {
    id: user.id,
    username: user.username,
    name: user.name,
  };

  return jwt.sign(payload, config.secretKey, { expiresIn: '1h' });
}

function verifyToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
  }

  try {
    const decoded = jwt.verify(token, config.secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Token inválido.' });
  }
}

module.exports = { generateToken, verifyToken };