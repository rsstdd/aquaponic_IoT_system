'use strict';

const express = require('express');
const boom = require('boom');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');
const jwt = require('jsonwebtoken');

// eslint-disable-next-line new-cap
const router = express.Router();

const authorize = function(req, res, next) {
  jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err) => {
    res.verify = err === null;
    next();
  });
};

router.get('/sensors', (_req, res, next) => {
  knex('sensors')
    .orderBy('id')
    .then((rows) => {
      const measurements = camelizeKeys(rows);

      res.send(measurements);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/sensors', (req, res, next) => {
  /* eslint-disable max-len */
  const { waterTemp, airTemp, humidity } = req.body;
  console.log(req.body);

  knex('sensors')
    .insert(decamelizeKeys({
      waterTemp: waterTemp,
      airTemp: airTemp,
      humidity: humidity
    }), '*')
    .catch((err) => {
      next(err);
    });
});

router.get('/sensors/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return next();
  }

  knex('sensors')
    .where('id', id)
    .first()
    .then((row) => {
      if (!row) {
        throw boom.create(
          'Not Found'
        );
      }

      const measurements = camelizeKeys(row);

      res.send(measurements);
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/sensors/:id', (req, res, next) => {
  let measurement;
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(Number.parseInt(id))) {
    return next();
  }

  knex('sensors')
    .where('id', id)
    .first()
    .then((row) => {
      if (!row) {
        throw boom.create(404, 'Not Found');
      }

      measurement = camelizeKeys(row);

      return knex('sensors')
        .del()
        .where('id', id);
    })
    .then(() => {
      delete measurement.id;

      res.send(measurement);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
