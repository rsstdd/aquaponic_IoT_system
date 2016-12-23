'use strict';

const express = require('express');
const knex = require('../knex');
const boom = require('boom');
const { camelizeKeys, decamelizeKeys } = require('humps');
const jwt = require('jsonwebtoken');

const router = express.Router();

const authorize = function(req, res, next) {
  jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded) => {
    res.verify = err === null;
    req.token = decoded;
    next();
  });
};

router.get('/me', authorize, (req, res, next) => {
  const { userId } = req.token;
  let user;

  knex('users')
    .where('auth_id', userId)
    .first()
    .then((row) => {
      if (!row) {
        throw boom.create(
          'Not Found'
        );
      }

      user = camelizeKeys(row);

      delete user.hashedPassword;

      res.send(user);
    })
    .catch((err) => {
      next(err);
      res.redirect('/');
    });
});

module.exports = router;
