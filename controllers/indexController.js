const club = require('../database/queries/club');

const indexController = {
  home: async (req, res) => {
    // let message = null;
    // if (req.session.messages) {
    //   req.session.messages = req.session.messages.slice(0, 1);
    //   message = req.session.messages[0];
    // }
    const isMember =
      req.isAuthenticated() && req.user.membership_status == 'active';
    const messages = await club.getMessages(isMember);
    res.render('pages/index', {
      messages,
      // message,
    });
  },
};

module.exports = indexController;
