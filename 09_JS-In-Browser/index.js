const express = require('express')
const utils = require('./utils')

const app = express()

const apiRouter = require('./api')

app.use(express.static('public'))

// middleware to parse application/json content-type requests
// the content will be added to the req.body object and we can easily use it
app.use(express.json())

app.set('view engine', 'ejs')
app.set('layout', './layout')

app.use('/api', apiRouter)

app.use((err, req, res, next) => {
    if (err) {
        console.error('Error occurred: ' + err)
        res.status(401).send('Unauthorized!')
    } else {
        next()
    }
})

app.get('/', (req, res) => {
    utils.renderWithLayout(res, 'home', 'HOME', { results: { name: 'Express', year: 2021 } });
})

app.get('/about', (req, res) => {
    utils.renderWithLayout(res, 'about', 'ABOUT US', { message: 'This is simple express app with users API' });
})

app.listen(8080, () => {
    console.log('Server is listening on :8080');
})