const auth = require('./auth');

const roles = (roles) => {
  return [
    auth,
    (req, res, next) => {
      const role = req.user.role;
      if (!roles.includes(role)) {
        req.session.messages = ['You do not have permission'];
        return res.redirec('/');
      }
      next();
    },
  ];
};

module.exports = roles;
