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

// const arduino = require('./arduino.js')();
const io = require('socket.io')(server);
'use strict';

const five = require('johnny-five');
const board = new five.Board();

module.exports = function() {
  console.log('______________________|===========|__________________________');
  console.log('______________________|--Arduino--|__________________________');
  console.log('______________________|===========|__________________________');

  // --------------------------
  // Temperature Sensor
  // --------------------------

  board.on('ready', function() {
    // This requires OneWire support using the ConfigurableFirmata
    var thermometer = new five.Thermometer({
      controller: 'DS18B20',
      pin: 2
    });

    thermometer.on("change", function() {
      const temp = this.fahrenheit.toFixed(1);
      console.log(this.fahrenheit.toFixed(1) + "°F");
      // console.log("0x" + this.address.toString(16));
    });
  });

  // --------------------------
  // Temperature Humidity Sensor
  // --------------------------

//   board.on("ready", function() {
//     var multi = new five.Multi({
//       controller: "HIH6130"
//     });
//
//     multi.on("data", function() {
//       console.log("Thermometer");
//       console.log("  celsius           : ", this.thermometer.celsius);
//       console.log("  fahrenheit        : ", this.thermometer.fahrenheit);
//       console.log("  kelvin            : ", this.thermometer.kelvin);
//       console.log("--------------------------------------");
//
//       console.log("Hygrometer");
//       console.log("  relative humidity : ", this.hygrometer.relativeHumidity);
//       console.log("--------------------------------------");
//     });
//   });
// };

  //--------------------------
  // Servo
  //--------------------------

  // servo = new five.Servo({
  //     pin: 12,
  //     type: 'continuous'
  // });
  //
  // servo.stop();
  // daylights.off();

  // function lightScheduler(){
  //
  //   getCurrentTime();
  //   console.log('current hour is ' + currentHour);
  //
  //   if (dayLightSchedule = true) {
  //
  //     if (currentHour >= dayLightStartTime && currentHour <= dayLightEndTime) {
  //         daylights.on();
  //     } else {
  //       daylights.off();
  //       console.log('Daylight off')
  //     }
  //   }
  // }

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

// --------------------------
// Socket.io
// --------------------------
// Used for streaming results

io.on('connection', function (socket) {
  console.log(temp);
  // socket.emit('news', { hello: 'world' });
  // socket.on('my other event', function (data) {
  //   console.log(data);
  // });
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
