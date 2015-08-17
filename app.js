var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// dev routers
var routers = require('./routes/');
var session = require('express-session');
var create = require('./routes/newVendor');
var sess = {
  secret: 'team vita',
  resave: false,
  saveUninitialized: true,
  cookie: { }
};

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('mysecret'));

app.use('/', express.static(path.join(__dirname, './client')));
app.use('/create', create);

// For testing purposes only TODO refactor path for handling signup
>>>>>>> [refactor] Refactor app.js routing in preparation for transaction handling from front end
app.post('/signup', function (req, res) {
  var data = req.body;
  res.send(data);
});

// Router set-up
var env = process.env.NODE_ENV || 'development';
if (env === 'development') {
  sess.cookie.secure = true;
  app.use(session(sess));
  app.use('/auth', routers.auth);

  app.use('/donor', routers.donor);
  app.use('/org', routers.organization);
};

module.exports = app;
