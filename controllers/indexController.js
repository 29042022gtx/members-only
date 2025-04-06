const club = require('../database/queries/club');

const indexController = {
  home: async (req, res) => {
    const isMember =
      req.isAuthenticated() && req.user.membership_status == 'active';
    const messages = await club.getMessages(isMember);
    res.render('pages/index', {
      messages,
    });
  },
};

module.exports = indexController;
