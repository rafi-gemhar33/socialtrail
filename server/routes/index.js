var express = require('express');
var router = express.Router();
const cssPath = process.env.NODE_ENV == 'production' ? '/dist/bundle/bundle.css' : '/static/bundle.css';
 const jsPath = process.env.NODE_ENV == 'production' ? '/dist/bundle/bundle.js' : '/static/bundle.js';
 /* GET home page. */
 router.get('*', function(req, res, next) {
  res.render('index', { title: 'Social-Trails | AltCampus', jsPath, cssPath });
  // res.render('index', { title: 'Social-media-stats' });
});

module.exports = router;
