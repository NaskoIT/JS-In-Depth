const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const jwt = require('./jwt');
const utils = require('./utils');
const app = express();

const blacklist = []

const users = [
    {
        email: 'nasko.it@js.com',
        password: '123456',
        firstName: 'Atanas',
        lastName: 'Vasilev'
    }
];


function auth(req, res, next) {
    const token = utils.getTokenFromRequest(req)

    jwt.verify(token)
        .then(({ user }) => {
            req.user = user
            next()
        })
        .catch(next)
}

const apiRouter = require('./api');
app.use(cookieParser({ secret: 'cookiesecret' }));
app.use(express.static('public'));
app.use(express.json());

app.set('json replacer', utils.jsonReplacer)

app.get('/authenticate', (req, res) => {
    const token = utils.getTokenFromRequest(req)
    jwt.verify(token)
        .then(({ user }) => {
            res.send({ user });
        })
        .catch(() => {
            res.send({ user: null });
        })
})

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const returnToken = !!req.query.returnToken;
    const user = users.find((user) => user.email === email && user.password === password);
    const ops = user ? jwt.createToken({ user }).then(token => [user, token]) : Promise.resolve([user, null]);
    ops.then(([user, token]) => {
        if (!returnToken) {
            res.cookie('auth-cookie', token, { httpOnly: true });
            token = undefined
        }

        res.send({ user, token });
    });
});

app.post('/logout', (req, res) => {
    const token = utils.getTokenFromRequest(req)
    blacklist.push(token);
    res.clearCookie('auth-cookie').send({ token: null });
});

app.use('/api', auth, apiRouter);

app.get('*', (req, res) => {
    res.sendFile(path.resolve('./index.html'))
})

app.use((err, req, res, next) => {
    if (err.message.includes('jwt')) {
        return void res
            .clearCookie('auth-cookie')
            .status(401)
            .send({ message: 'Unauthenticated' });
    }

    if (err.message === 'not found') {
        return void res.status(404).send({ message: 'Not found' });
    }

    res.status(500).send({ message: 'Server error' });
});

app.listen(8080, () => {
    console.log('Server is listening on :8080');
});