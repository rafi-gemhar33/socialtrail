const express = require('express');
const router = express.Router();

const userApi = require('./users');
const twitterRouter = require('./twitter');
const youtubeRouter = require('./youtube');

// get user router
router.use('/users', userApi);
// twitter rout handle
router.use('/twitter', twitterRouter);
// youtube rout handle
router.use('/youtube', youtubeRouter);

/* GET home page. */
// router.get('/', function (req, res, next) {
//   res.json({success: true, message: 'Welcome to Node APIs'});
// });

module.exports = router;
