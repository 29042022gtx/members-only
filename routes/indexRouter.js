const { Router } = require('express');
const authenController = require('../controllers/authenController');
const clubController = require('../controllers/clubController');

const indexRouter = Router();
indexRouter.get('/', (req, res) => {
  res.render('pages/index');
});
indexRouter.get('/login', authenController.getLogin);
indexRouter.post('/login', authenController.postLogin);
indexRouter.get('/sign-up', authenController.getSignUp);
indexRouter.post('/sign-up', authenController.postSignUp);
indexRouter.post('/logout', authenController.postLogout);
indexRouter.get('/join-club', clubController.getJoinClub);
indexRouter.get('/join-club', clubController.getJoinClub);

module.exports = indexRouter;
