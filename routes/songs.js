const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'nastia!2006',
  database: 'blohsh'
});

connection.connect();

router.get('/', (req, res) => {
  const album = req.query.album;
  const query = album
    ? 'SELECT * FROM songs WHERE album = ? ORDER BY track_number'
    : 'SELECT * FROM songs ORDER BY album, track_number';

  connection.query(query, album ? [album] : [], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

module.exports = router;
