const jwt = require('jsonwebtoken')
const secret = 'superprivate'

module.exports.createToken = function (payload) {
    return new Promise((resolve, reject) => {
        const { password, ...payloadWithoutPassword } = payload
        jwt.sign(payloadWithoutPassword, secret, { expiresIn: '1h' }, (err, token) => {
            if (err) {
                return void reject(err)
            }

            resolve(token)
        })
    })
}

module.exports.verify = function (token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                return void reject(err)
            }

            resolve(decodedToken)
        })
    })
}