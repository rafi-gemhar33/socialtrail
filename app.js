require('dotenv').config()

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const expressStaticGzip = require('express-static-gzip');
const mongoose = require('mongoose');

const CronJob = require('cron').CronJob

const indexRouter = require('./server/routes/index');
const apiRouter = require('./server/routes/api');
const updateDBwithCJ = require('./server/utils/cronjob');

const app = express();

app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, '/server/views'));
app.set('view engine', 'ejs');

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}

app.set('trust proxy', true);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/dist/bundle', expressStaticGzip(path.join(__dirname, 'dist/bundle'), {
  enableBrotli: true,
  orderPreference: ['br', 'gz'],
  setHeaders: function (res, path) {
    res.setHeader('Cache-Control', 'public, max-age=31536000');
  }
}));

// fix depreciation warning.
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);

// connect to mongodb
mongoose.connect('mongodb://localhost:27017/social-Tracker', function (err) {
  console.log('mongodb connected ?', err ? false : true);
});

// webpack
if (process.env.NODE_ENV === 'development') {
  console.log();
  
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config.prod');
  const compiler = webpack(webpackConfig);

  app.use(
    require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    })
  );

  app.use(require('webpack-hot-middleware')(compiler));
}

// Route handler
app.use('/api/v1', apiRouter) // api route handler
app.use('/*', indexRouter); // react handler

new CronJob('1 0 0 * * *', function() {
  updateDBwithCJ.updateTwitterAccount();
}, null, true, 'Asia/Kolkata');


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
