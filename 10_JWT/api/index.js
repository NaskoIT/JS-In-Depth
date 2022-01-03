const Router = require('express').Router;
const userRouter = require('./user-router');

const apiRouter = Router();

const users = [
  {
    id: 1,
    firstName: 'Atanas',
    lastName: 'Vasilev'
  }
];

const applyUsersToRequest = (req, res, next) => {
  res.locals.users = users;
  next();
}

apiRouter.use('/user', applyUsersToRequest, userRouter);

module.exports = apiRouter;