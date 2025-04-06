const { body, validationResult } = require('express-validator');
const toValidateErr = require('../utils/toValidateErr');
const club = require('../database/queries/club');

const clubController = {
  getJoinClub: (req, res) => {
    res.render('pages/join-club');
  },

  postJoinClub: async (req, res) => {
    // locals.validateErr?.[name]
    if (req.body.passcode != 2005) {
      return res.render('pages/join-club', {
        old: req.body,
        validateErr: {
          passcode: 'Invalid passcode',
        },
      });
    }
    await club.updateUserMembershipStatus(req.user.user_id, 'active');
    res.redirect('/');
  },

  getNewMessage: (req, res) => {
    res.render('pages/new-message');
  },

  postNewMessage: [
    body('title')
      .trim()
      .isLength({
        min: 1,
        max: 50,
      })
      .withMessage('Title must be 1 to 50 letters'),
    body('content')
      .trim()
      .isLength({
        min: 1,
        max: 200,
      })
      .withMessage('Content must be 1 to 200 letters'),
    async (req, res, next) => {
      const validateErr = toValidateErr(validationResult(req).mapped());
      if (validateErr) {
        return res.render('pages/new-message', {
          old: req.body,
          validateErr,
        });
      }
      next();
    },
    async (req, res) => {
      await club.addMessage({
        ...req.body,
        author_id: req.user.user_id,
      });
      res.redirect('/');
    },
  ],
};

module.exports = clubController;
