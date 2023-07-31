// server.js

const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(bodyParser.json());

const SECRET_KEY = 'your-secret-key'; // Ganti dengan secret key yang aman

const users = [
  { id: 1, username: 'user1', password: '$2a$10$thdR47l4dhhWkZdsQg5BDeNqluOTIKUx3oCbCBnd1jFV89GnNjVnK' }, // Password: user1password
  { id: 2, username: 'user2', password: '$2a$10$thdR47l4dhhWkZdsQg5BDeNqluOTIKUx3oCbCBnd1jFV89GnNjVnK' }, // Password: user2password
];

// Fungsi untuk men-generate token
function generateToken(user) {
  const payload = {
    id: user.id,
    username: user.username,
  };
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' }); // Token berlaku selama 1 jam
}

// Endpoint untuk login
app.post('/', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid password' });
  }

  const token = generateToken(user);
  res.json({ token });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
