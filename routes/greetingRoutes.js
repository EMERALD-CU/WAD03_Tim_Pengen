const express = require('express');
const router = express.Router();

// GET /greeting?name=Tita
router.get('/', (req, res) => {
  const { name } = req.query;

  if (!name || name.trim() === '') {
    return res.status(400).json({ message: 'Tolong isi query ?name ya' });
  }

  res.json({ message: `Hello ${name}` });
});

module.exports = router;