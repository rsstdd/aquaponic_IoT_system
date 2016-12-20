'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const server = require('http').createServer(app);

// Arduino board connection
const arduino = require('./arduino.js')();
// const io = require('socket.io')(server);

// --------------------------
// Socket.io
// --------------------------
// Used for streaming results

// const tempIn = io.of('/temp');
// const tempOut = io.of('/photo');
// const humidity = io.of('/humidity');
// const photo = io.of('/photo');
// const relay = io.of('/relay');
//
// app.use(tempIn);
// app.use(tempOut);
// app.use(humidity);
// app.use(photo);
// app.use(relay);

app.disable('x-powered-by');

switch (app.get('env')) {
  case 'development':
    app.use(morgan('dev'));
    break;

  case 'production':
    app.use(morgan('short'));
    break;

  default:
}

app.use(bodyParser.json());
app.use(cookieParser());

const path = require('path');

app.use(express.static(path.join('public')));

app.use((_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const auth = require('./routes/auth');

// CSRF protection
app.use((req, res, next) => {
  if (!req.path.startsWith('/api') || /json/.test(req.get('Accept'))) {
    return next();
  }

  res.sendStatus(406);
});

app.use('/auth', auth);

app.use((err, _req, res, _next) => {
  if (err.output && err.output.statusCode) {
    return res
      .status(err.output.statusCode)
      .set('Content-Type', 'text/plain')
      .send(err.message);
  }

  if (err.status) {
    return res
      .status(err.status)
      .set('Content-Type', 'text/plain')
      .send(err.errors[0].messages[0]);
  }

  // eslint-disable-next-line no-console
  console.error(err.stack);
  res.sendStatus(500);
});

console.log('______________________|==========|__________________________');
console.log('______________________|--SERVER--|__________________________');
console.log('______________________|==========|__________________________');

const port = process.env.PORT || 8000;

app.listen(port, () => {
  if (app.get('env') !== 'test') {
    // eslint-disable-next-line no-console
    console.log(`Server Listening on port ${port}`);
  }
});

module.exports = app;
