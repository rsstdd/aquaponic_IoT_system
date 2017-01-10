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
const path = require('path');
const flash = require('connect-flash');
const twilioNotifications = require('./middleware/twilioNotifications');
const passport = require('passport');
const server = http.createServer(app);

server.listen(8080);

const socketIO = require('socket.io');
const io = socketIO(server);
const five = require('johnny-five');
const twilioClient = require('./twilioClient');

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

let waterTemp = 0;
let airTemp = 0;
let humidity = 0;

// // '/dev/cu.usbmodem58', '/dev/cu.usbmodem1411'
// const boards = new five.Boards(['A', 'B']).on('ready', function() {
  console.log('______________________|===========|__________________________');
  console.log('______________________|--Arduino--|__________________________');
  console.log('______________________|===========|__________________________');


const board = new five.Board();
board.on('ready', function() {
  //  board B - requires OneWire support w/ ConfigurableFirmata
  const thermometer = new five.Thermometer({
    controller: 'DS18B20',
    pin: 1 // Digital pin
    // board: this.byId('B')
  });

  // const multi = new five.Multi({
  //   controller: 'BMP180',
  //   board: this.byId('A')
  // });

  // --------------------------
  // Temperature Sensor
  // --------------------------

  thermometer.on('change', function() {
    waterTemp = this.fahrenheit.toFixed(1);

    console.log('arduino: H20 ', waterTemp);
    console.log('--------------------------------------');
  });

  // ------------------------------
  // Temperature & Humidity Sensor
  // ------------------------------

  // multi.on('change', function() {
  //   console.log('arduino: 02 ', airTemp);
  //   console.log('temperature');
  //   console.log('fahrenheit: ', this.temperature.fahrenheit + 40);
  //   airTemp = (this.temperature.fahrenheit + 40).toFixed(1);
  //   console.log('--------------------------------------');
  //
  //   humidity = ((this.barometer.pressure * 200 + 40).toFixed(1));
  //   console.log('--------------------------------------');
  // });
});

// --------------------------
// Twilio SMS Alert
// --------------------------

// setInterval(() => {
//   if (waterTemp <= 60 || waterTemp >= 80) {
//     twilioClient.sendSms();
//   }
// }, 18000);

// --------------------------
// Socket.io
// --------------------------

io.on('connection', (socket) => {
  const tm = setInterval(() => {
    console.log('--------------------SOCKET--------------------------');
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

app.use(twilioNotifications.notifyOnError);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const auth = require('./routes/auth');
const me = require('./routes/me');

app.use('/auth', auth);
app.use('/api', me);

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
