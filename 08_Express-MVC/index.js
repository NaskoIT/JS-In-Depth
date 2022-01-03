const express = require('express')
const utils = require('./utils')
const app = express()

app.use(express.static('public'))

app.set('view engine', 'ejs')
app.set('layout', './layout')

app.get('/', (req, res) => {
    utils.renderWithLayout(res, 'home', 'HOME PAGE', { results: { name: 'Express', year: 2021 } })
})

app.get('/about', (req, res) => {
    utils.renderWithLayout(res, 'about', 'ABOUT US', { message: 'Welcome to our simple MVC APP'})
})

app.listen(8080, () => {
    console.log('Server is listening on port: 8080')
})