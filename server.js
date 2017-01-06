'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const http = require('http');

const server = http.createServer(app);

const passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());

// Arduino board connection

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

server.listen(8080);
const socketIO = require('socket.io');
const io = socketIO(server);

console.log('______________________|===========|__________________________');
console.log('______________________|--Arduino--|__________________________');
console.log('______________________|===========|__________________________');

const five = require('johnny-five');
const ports = [
  { id: 'A', port: '/dev/cu.usbmodem1411' }, // this[1]
  { id: 'B', port: '/dev/cu.usbmodem60' } // this[0]
];

let waterTemp = 0;
let airTemp = 0;
let humidity = 0;

// // '/dev/cu.usbmodem58', '/dev/cu.usbmodem1411'
//['A', 'B']
const boards = new five.Boards(['A', 'B']);

boards.on('ready', function() {

  //  board A - requires OneWire support w/ ConfigurableFirmata
    const thermometer = new five.Thermometer({
      controller: 'DS18B20',
      pin: 2, // Digital pin
      board: this.byId('A')
    });

  // console.log(this.byId('B'));
  const multi = new five.Multi({
    controller: 'BMP180',
    board: this.byId('B')
  });

  // console.log(this.byId('A'));
  // console.log(multi);
  // console.log(thermometer);

  // --------------------------
  // Temperature Sensor
  // --------------------------

  thermometer.on('change', function() {
    waterTemp = this.fahrenheit.toFixed(1);

    // console.log('arduino: ', waterTemp);
    // console.log('--------------------------------------');
  });

    // ------------------------------
    // Temperature & Humidity Sensor
    // ------------------------------

  multi.on('change', function() {
    // console.log('temperature');
    // console.log('fahrenheit: ', this.temperature.fahrenheit + 40);
    airTemp = (this.temperature.fahrenheit + 40).toFixed(1);
    // console.log('--------------------------------------');

    // console.log('Barometer');
    // console.log('pressure: ', this.barometer.pressure);
    humidity = ((this.barometer.pressure * 200 + 40).toFixed(1));
    console.log('--------------------------------------');
  });
});

// --------------------------
// Socket.io
// --------------------------
// Used for streaming results

io.on('connection', (socket) => {
  const tm = setInterval(() => {
    console.log('------------------SOCKET--------------------------');
    socket.emit('waterTemp', { 'waterTemp': waterTemp });
    socket.emit('airTemp', { 'airTemp': airTemp });
    socket.emit('humidity', { 'humidity': humidity });
    console.log('socket: H20', waterTemp);
    console.log('socket: 02', airTemp);
    console.log('socket: Rh', humidity);
  }, 5000);

  socket.on('disconnect', () => {
    clearInterval(tm);
  });
});

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

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const path = require('path');

const auth = require('./routes/auth');
const me = require('./routes/me');
// const sensors = require('./routes/sensors');

app.use('/auth', auth);
app.use('/api', me);

// app.use('/api', sensors);

// CSRF protection
app.use((req, res, next) => {
  if (!req.path.startsWith('/api') || /json/.test(req.get('Accept'))) {
    return next();
  }

  res.sendStatus(406);
});

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
      .send(err.errors[0].messages[0])
      .send(err.errors);
  }

  // eslint-disable-next-line no-console
  console.error(err.stack);
  res.sendStatus(500);
});

app.use(express.static(path.join('public')));

app.use((_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
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
