const { body, validationResult } = require('express-validator');
const toValidateErr = require('../utils/toValidateErr');
const authen = require('../database/queries/authen');
const passport = require('passport');

const authenController = {
  getSignUp: (req, res) => {
    res.render('pages/sign-up');
  },

  postSignUp: [
    body('firstName')
      .trim()
      .isLength({
        min: 1,
        max: 50,
      })
      .withMessage('First name must be 1 to 50 letters'),
    body('lastName')
      .trim()
      .isLength({
        min: 1,
        max: 50,
      })
      .withMessage('Last name must be 1 to 50 letters'),
    body('email')
      .isEmail()
      .withMessage('Email is invalid')
      .custom(async (value) => {
        if (await authen.isUsedEmail(value)) {
          throw new Error('E-mail already in use');
        }
      }),
    body('password')
      .isLength({
        min: 8,
        max: 255,
      })
      .withMessage('Password must be 8 to 255 letters'),
    body('confirmPassword').custom((value, { req }) => {
      if (value != req.body.password) {
        throw new Error('Confirm password not match');
      }
      return true;
    }),
    async (req, res) => {
      const validateErr = toValidateErr(validationResult(req).mapped());
      if (validateErr) {
        return res.render('pages/sign-up', {
          old: req.body,
          validateErr,
        });
      }
      await authen.addUser(req.body);
      res.redirect('/');
    },
  ],

  getLogin: (req, res) => {
    let message = null;
    if (req.session.messages) {
      req.session.messages = req.session.messages.slice(0, 1);
      message = req.session.messages[0];
    }
    res.render('pages/login', {
      message,
    });
  },

  postLogin: [
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureMessage: 'Invalid credentials',
    }),
    // (req, res, next) => {
    //   passport.authenticate('local', {}, (err, user) => {
    //     if (!user) {
    //       return res.redirect('/login');
    //     }
    //     // console.log(err);
    //     // res.redirect('/');
    //     console.log(req.user)
    //     res.send('Authentic!');
    //   })(req, res, next);
    // },
  ],

  postLogout: (req, res, next) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  },
};

module.exports = authenController;
