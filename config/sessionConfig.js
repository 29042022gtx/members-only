const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);

const sessionConfig = session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: new pgSession({
    pool: require("../database/connects/pool"),
    tableName: "session",
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
  },
});

module.exports = sessionConfig;
