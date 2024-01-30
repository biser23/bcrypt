const express = require('express');
const router = express.Router();
const users = require('../data/users');
const { hashPassword, comparePasswords } = require('../crypto/bcrypt');
const { generateToken, verifyToken } = require('../middlewares/authMiddleware');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user || !(await comparePasswords(password, user.password))) {
    return res.status(401).json({ message: 'Credenciales incorrectas.' });
  }

  const token = generateToken(user);
  res.json({ token });
});

router.get('/secure', verifyToken, (req, res) => {
  res.json({ message: 'Bienvenido a la ruta segura', user: req.user });
});

module.exports = router;