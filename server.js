'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const five = require('johnny-five');
const board = new five.Board({
  debug: true,
  repl: false
});
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// --------------------------
// Socket.io
// --------------------------
// Used for streaming results

const tempIn = io.of('/temp');
const tempOut = io.of('/photo');
const humidity = io.of('/humidity');
const photo = io.of('/photo');
const relay = io.of('/relay');

app.use(tempIn);
app.use(tempOut);
app.use(humidity);
app.use(photo);
app.use(relay);

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

// Arduino board connection

board.on("ready", function() {
  const rgb = new five.Led.RGB([6, 5, 3]); // pins with options obj and pins obj
  let index = 0;
  const rainbow = ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#4B0082", "#8F00FF"];
  //  var rainbow = ['#5d8aa8', '#ffbf00',' #a4c639']

  this.loop(1000, function() {
    if (index + 1 === rainbow.length) {
      index = 0;
    }
    rgb.color(rainbow[index++]);
    rgb.intensity(1000);
  });
});

// require('./arduino');
// app.use(arduino);
console.log('here');

// console.log(arduino);

// CSRF protection
app.use((req, res, next) => {
  if (!req.path.startsWith('/api') || /json/.test(req.get('Accept'))) {
    return next();
  }

  res.sendStatus(406);
});

// app.use(arduino);

// Socket Connection handler

// io.sockets.on('connectioon', () => {
//   // console.log(socket.id);
//   //
//   // socket.on('led:on', (data) => {
//   //   led.on();
//   //   console.log('LED ON REVIEVED');
//   // });
//   //
//   // socket.on('led:off', (data) => {
//   //   console.log('LED OFF RECIEVED');
//   // });
//   if (board.ready) {
//     socket.emit('led:status', rgb.isOn ? 'on' : 'off');
//
//     button.on('press', () => {
//       socket.emit('led:status', rgb.isOn ? 'on' : 'off');
//     });
//
//     socket.on('led:toggle', () => {
//       led.toggle();
//       io.socket.emit('led:status', rgb.isOn ? 'on' : 'off');
//     });
//   }
// });

console.log('Waiting for connection');

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
