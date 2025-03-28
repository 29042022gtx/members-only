const { Router } = require('express');
const authenController = require('../controllers/authenController');

const indexRouter = Router();
// indexRouter.get('/', );
indexRouter.get('/sign-up', authenController.getSignUp);
indexRouter.post('/sign-up', authenController.postSignUp);

module.exports = indexRouter;
