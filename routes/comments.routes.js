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

router.get('/', (req, res) => {
  const query = `
  SELECT comments.*, users.role 
  FROM comments 
  JOIN users ON comments.user_id = users.id 
  ORDER BY comments.created_at DESC
`;

  connection.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

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

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  if (!content) return res.status(400).send({ error: 'Missing content' });

  const query = 'UPDATE comments SET content = ? WHERE id = ?';
  connection.query(query, [content, id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ success: true }); 
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM comments WHERE id = ?';
  connection.query(query, [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ success: true }); 
  });
});


module.exports = router;
