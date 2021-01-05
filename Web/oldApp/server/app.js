var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

const jwt = require("./login/jwt");
app.use(jwt());
var indexRouter = require('./routes/index');
app.use('/', indexRouter);


// zeigt klar an, dass eine API angesprochen wird und JSON Daten, keine Webseiten geliefert werden.
var articleRouter = require('./routes/article');
app.use('/api/article', articleRouter);

var userRouter = require('./routes/user');
app.use('/api/user', userRouter);

var userArticle = require('./routes/userArticle');
app.use('/api/userarticle', userArticle);


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

var port = 3000;
app.listen(port, function () {
  console.log('app listening on port ' + port);
});

module.exports = app;
