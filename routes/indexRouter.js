const { Router } = require('express');
const authenController = require('../controllers/authenController');

const indexRouter = Router();
indexRouter.get('/', (req, res) => {
  res.send('home page')
});
indexRouter.get('/sign-up', authenController.getSignUp);
indexRouter.post('/sign-up', authenController.postSignUp);

module.exports = indexRouter;
