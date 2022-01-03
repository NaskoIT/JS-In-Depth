const Router = require('express').Router
const UserRouter = new Router()

// GET ALL
UserRouter.get('/', (req, res) => {
    res.send(res.locals.users)
})

// GET BY ID
UserRouter.get('/:id', (req, res) => {
    res.send(res.locals.users.find(u => u.id === +req.params.id))
})

// UPDATE
UserRouter.put('/:id', (req, res) => {
    const { firstName, lastName } = req.body
    const user = res.locals.users.find(u => u.id === +req.params.id)
    user.firstName = firstName
    user.lastName = lastName

    res.send(user)
})

// CREATE
UserRouter.post('/', (req, res) => {
    const {firstName, lastName} = req.body
    const user = {
        id: res.locals.users.length + 1,
        firstName,
        lastName
    }

    res.locals.users.push(user)
    res.send({...user})
})

// DELETE
UserRouter.delete('/:id', (req, res) => {
    const id = +req.params.id
    res.locals.users = res.locals.users.filter(u => u.id !== id)

    res.send(`User with id: ${id} was deleted.`)
})

module.exports = UserRouter