'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();

app.disable('x-powered-by');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const five = require('johnny-five');
const io = require('socket.io')(app);

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

// CSRF protection
app.use((req, res, next) => {
  if (!req.path.startsWith('/api') || /json/.test(req.get('Accept'))) {
    return next();
  }

  res.sendStatus(406);
});

app.use((_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Arduino board connection

board.on('ready', function() {
  console.log('Arduino connected');
  const rgb = new five.Led.RGB([6, 5, 3]); // pins with options obj and pins obj
  let i = 0;
  const cols = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8F00FF'];

  // var rainbow = ['#5d8aa8', '#ffbf00',' #a4c639']

  this.loop(1000, function() {
    if (i + 1 === cols.length) {
      i = 0;
    }
    rgb.color(cols[i++]);
    rgb.intensity(1000);
  });
});

// Socket Connection handler
//
// io.on('connectioon', () => {
//   console.log(socket.id);
//
//   socket.on('led:on', (data) => {
//     led.on();
//     console.log('LED ON REVIEVED');
//   });
//
//   socket.on('led:off', (data) => {
//     console.log('LED OFF RECIEVED');
//   });
// });
//
// console.log('Waiting for connection');

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

const port = process.env.PORT || 8000;

app.listen(port, () => {
  if (app.get('env') !== 'test') {
    // eslint-disable-next-line no-console
    console.log(`Listening on port: ${port}`);
  }
});

module.exports = app;
