const { Router } = require('express');
const authenController = require('../controllers/authenController');
const clubController = require('../controllers/clubController');
const auth = require('../middlewares/auth');
const indexController = require('../controllers/indexController');

const indexRouter = Router();
indexRouter.get('/', indexController.home);
indexRouter.get('/login', authenController.getLogin);
indexRouter.post('/login', authenController.postLogin);
indexRouter.get('/sign-up', authenController.getSignUp);
indexRouter.post('/sign-up', authenController.postSignUp);
indexRouter.post('/logout', authenController.postLogout);
indexRouter.get('/join-club', auth, clubController.getJoinClub);
indexRouter.post('/join-club', auth, clubController.postJoinClub);
indexRouter.get('/new-message', auth, clubController.getNewMessage);
indexRouter.post('/new-message', auth, clubController.postNewMessage);


module.exports = indexRouter;
