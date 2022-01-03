module.exports.jsonReplacer = (key, value) => {
    return key === 'password' ? undefined : value
}

module.exports.getTokenFromRequest = (req) => {
    return req.headers['access-token'] || req.cookies['auth-cookie']
}