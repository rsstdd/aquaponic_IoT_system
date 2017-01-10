'use strict';

const config = require('./config');
const client = require('twilio')(config.accountSid, config.authToken);

module.exports.sendSms = function(to, message) {
  client.messages.create({
    body: 'Aquaponics system is operating outside of Safe parameters',
    to: parseInt(config.toNumber),
    from: parseInt(config.sendingNumber)
  }, function(err, data) {
    if (err) {
      console.error('Could not notify administrator');
      console.error(err);
    } else {
      console.log('Administrator notified');
    }
  });
};
