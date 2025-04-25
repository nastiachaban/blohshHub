const express = require('express');
const router = express.Router();
const mysql = require('mysql');


// connection (you might already have this elsewhere)
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'nastia!2006',
  database: 'blohsh'
});

connection.connect();

// ➕ Add favourite
router.post('/:userId', (req, res) => {
  const userId = req.params.userId;
  const { song_name } = req.body;

  if (!userId || !song_name) return res.status(400).send('Missing data');

  const query = 'INSERT INTO favourites (user_id, song_name) VALUES (?, ?)';
  connection.query(query, [userId, song_name], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Added to favourites' });

  });
});

// ➖ Remove favourite
router.delete('/:userId/:songName', (req, res) => {
  const userId = req.params.userId;
  const songName = req.params.songName;

  const query = 'DELETE FROM favourites WHERE user_id = ? AND song_name = ?';
  connection.query(query, [userId, songName], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Favourite removed' });

  });
});

// 📥 Get favourites
router.get('/:userId', (req, res) => {
  const userId = req.params.userId;
  const query = `
    SELECT f.song_name, s.album 
    FROM favourites f
    JOIN songs s ON f.song_name = s.title
    WHERE f.user_id = ?
  `;

  connection.query(query, [userId], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results); 
  });
});

module.exports = router;
