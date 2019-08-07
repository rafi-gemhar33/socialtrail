const express = require('express');
const router = express.Router();

const userApi = require('./users');

// get user router
router.use('/users', userApi);

/* GET home page. */
// router.get('/', function (req, res, next) {
//   res.json({success: true, message: 'Welcome to Node APIs'});
// });

module.exports = router;
