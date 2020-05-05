const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/secrets.js');

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username
    };

    const secret = jwtSecret;

    const options = {
        expiresIn: '1hr'
    };

    return jwt.sign(payload, secret, options);
};

module.exports = generateToken;