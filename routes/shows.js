const express = require('express');
const router = express.Router();
const shows = require('../data/shows.json');

router.get('/', (req, res) => {
  res.json(shows);
});

module.exports = router;
