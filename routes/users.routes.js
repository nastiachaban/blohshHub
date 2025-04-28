const express = require('express');
const router = express.Router();
const connection = require('../mysql'); 

router.get('/stats/:username', (req, res) => {
  const username = req.params.username;

  connection.query('SELECT wordleWins, userRank FROM users WHERE username = ?', [username], (err, results) => {
    if (err) return res.status(500).send(err);

    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  });
});


router.post('/win', (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).send({ message: 'Username is required' });
  }

  connection.query('UPDATE users SET wordleWins = wordleWins + 1 WHERE username = ?', [username], (err) => {
    if (err) return res.status(500).send(err);

    connection.query('SELECT wordleWins FROM users WHERE username = ?', [username], (err2, results) => {
      if (err2) return res.status(500).send(err2);

      const wins = results[0].wordleWins;
      const newRank = calculateRank(wins);

      connection.query('UPDATE users SET userRank = ? WHERE username = ?', [newRank, username], (err3) => {
        if (err3) return res.status(500).send(err3);

        res.status(200).json({ message: 'Win saved successfully!' });
      });
    });
  });
});

function calculateRank(wins) {
  if (wins >= 150) return 'Legend';
  if (wins >= 100) return 'Master';
  if (wins >= 50) return 'Expert';
  if (wins >= 30) return 'Pro';
  if (wins >= 15) return 'Intermediate';
  if (wins >= 5) return 'Beginner';
  return 'Newbie';
}

module.exports = router;
