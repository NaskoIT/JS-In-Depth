const Router = require('express').Router
const userRouter = require('./user-router')

const apiRouter = new Router()

const users = [{
    id: 1,
    firstName: 'Atanas',
    lastName: 'Vasilev'
}]

const applyUsersToRequest = (req, res, next) => {
    res.locals.users = users
    next()
}

const authorizationMiddleware = (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization && req.headers.authorization === 'nasko.it') {
        req.user = req.headers.authorization
        next()
    } else {
        next(new Error('Unauthorized!'))
    }
}

apiRouter.use('/user', authorizationMiddleware, applyUsersToRequest, userRouter)

module.exports = apiRouter