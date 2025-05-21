const express = require('express');
const router = express.Router();
const {
  getConfessions,
  createConfession,
  reactToConfession,
  addReply,
  reportConfession,
  getTrending
} = require('../controllers/confessionController');

router.get('/',        getConfessions);
router.post('/',       createConfession);
router.patch('/:id/react',   reactToConfession);
router.post('/:id/reply',    addReply);
router.patch('/:id/report',  reportConfession);
router.get('/trending',      getTrending);

module.exports = router;
