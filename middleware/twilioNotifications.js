'use strict';

const twilioClient = require('../twilioClient');
const fs = require('fs');
const admins = require('../config/admin.json');

const formatMessage = function() {
  return 'ALERT! It appears the system is operating outside of parameters';
};

exports.notifyOnError = function(appError, request, response, next) {

  admins.forEach((admin) => {
    const messageToSend = formatMessage(appError.message);

    twilioClient.sendSms(admin.phoneNumber, messageToSend);
  });
  next(appError);
};
