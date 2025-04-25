const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'nastia!2006',
  database: 'blohsh'
});

connection.connect();

// Get all comments
router.get('/', (req, res) => {
  const query = 'SELECT * FROM comments ORDER BY created_at DESC';
  connection.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Post a comment
router.post('/', (req, res) => {
  const { user_id, username, content } = req.body;

  if (!user_id || !username || !content) {
    return res.status(400).send('Missing data');
  }

  const query = 'INSERT INTO comments (user_id, username, content) VALUES (?, ?, ?)';
  connection.query(query, [user_id, username, content], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ id: result.insertId, user_id, username, content, created_at: new Date() });
  });
});

module.exports = router;
