require('dotenv').config();
if (process.env.NODE_ENV === 'development') {
  process.stdout.write('\x1b[2J\x1b[3J\x1b[H');
}
const path = require('node:path');
const express = require('express');
const passport = require('passport');
const indexRouter = require('./routes/indexRouter');
const sessionConfig = require('./config/sessionConfig');
require('./config/passport');

const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(sessionConfig);
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use('/', (req, res, next) => {
  res.locals.user = req.user;
  next();
});
app.use('/', indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serving at: \x1b[35mhttp://localhost:${PORT}\x1b[0m`);
});
