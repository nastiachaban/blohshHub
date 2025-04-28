const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const connection = require('../mysql'); 

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (username, password_hash) VALUES (?, ?)';
    connection.query(sql, [username, hash], (err, results) => {
      if (err) return res.status(500).json({ error: 'Signup failed', details: err });
      res.status(201).json({ id: results.insertId, username });
    });
  } catch (err) {
    res.status(500).json({ error: 'Signup error', details: err });
  }
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM users WHERE username = ?';
  connection.query(sql, [username], async (err, results) => {
    if (err || results.length === 0) return res.status(400).json({ error: 'Invalid credentials' });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(400).json({ error: 'Invalid credentials' });

    res.json({ id: user.id, username: user.username, role: user.role });
  });
});


module.exports = router;
