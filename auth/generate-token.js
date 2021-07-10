const jwt = require('jsonwebtoken'); //installed library
const { jwtSecret } = require('../config/secrets.js'); //will hold our secret

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username
    };

    const secret = jwtSecret;

    const options = {
        expiresIn: '1hr' //token expires in 1h
    };

    return jwt.sign(payload, secret, options); //signs the token with the payload, the secret and the options
};

module.exports = generateToken;