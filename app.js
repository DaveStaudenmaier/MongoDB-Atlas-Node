const express = require('express');
const bodyParser = require('body-parser');

// Bring in the data model
require('./api/models/db');

// Bring in the routes for the API (delete the default routes)
var routesApi = require('./api/routes/routes');

var app = express();

// req.body 
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// CORS Connection
app.use((req,res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ORIGIN);
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    // pre-flight request
    res.sendStatus(200);
  }
  else {
    next();
  }
});

// Use the API routes when path starts with /api
app.use('/api', routesApi);

// Error Handlers
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({"message": err.name + ": " + err.message});
  }
  console.log('fall through 500 error', err);
  return res.status(500).json({"message": err.name + ": " + err.message});
});

// development error handler which will print stack trace
if (app.get('process.env') === 'development') {
  app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
          message: err.message,
          error: err
      });
      return;
    });
}

// production error handler with no stack traces for security purposes
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
      message: err.message,
      error: {}
  });
  return;
});

module.exports = app;
