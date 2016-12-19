'use strict';

const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const { camelizeKeys, decamelizeKeys } = require('humps');
const request = require('request-promise')

const router = express.Router();

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use = new GoogleStrategy({ // this is the generic strategy
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://yourdormain:3000/auth/google/callback',
  passReqToCallback: true
}, (request, accessToken, refreshToken, profile, done) => {
  let googleProfile = null;

    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
  request({
    url: 'https://accounts.google.com/o/oauth2/v2/auth',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  .then((gProfile) => {
    googleProfile = JSON.parse(gProfile)

    return knex('users')
      .where('email', googleProfile.emailAddress)
      .first();
  })
  .then((user) => {
    if (user) {
      return camelizeKeys(user);
    }

    return knex('users')
      .insert(decamelizeKeys({
        firstName: googleProfile.firstName,
        lastName: googleProfile.lastName,
        email: googleProfile.emailAddress,
        gID: googleProfile.id,
        googleToken: accessToken
      }), '*');
  })
    .then((user) => {
      user = decamelizeKeys(user);
      done(null, user);
    })
    .catch((err) => {
      done(err);
    });
});

router.get('/auth/google', passport.authenticate('google', { scope: [
  'https://www.googleapis.com/auth/plus.login',
  'https://www.googleapis.com/auth/plus.profile.emails.read']
}));

router.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
  }), (req, res) => {
    const expiry = new Date(Date.now() + 1000 * 60 * 60 * 3);
    const token = jwt.sign({ userId: req.user.id }, process.env.JWT_SECRET, {
      expiresIn: '3h'
    });

    res.cookie('token', token, {
      httpOnly: true,
      expires: expiry,
      secure: router.get('env') === 'production'
    });

    res.redirect('/');
  });

router.get('/logout', (req, res) => {
  const expiry = new Date(Date.now() + 1000 * 60 * 60 * 3);

  res.cookie('loggedIn', 'false', { expires: expiry });
  res.clearCookie('token');
  res.redirect('/');
});

module.exports = router;
