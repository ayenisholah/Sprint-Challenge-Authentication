const jwt = require('jsonwebtoken');
const secret = require('../config/secrets')
const env = require('dotenv');

// const jwtKey =
//   process.env.JWT_SECRET ||
//   'add a .env file to root of project with the JWT_SECRET variable';

// quickly see what this file exports
module.exports = {
  authenticate,
};

// implementation details
function authenticate(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {
        if (err) {
            res.status(401).json({ you: 'not allowed' });
        } else {
            req.decodedToken = decodedToken;
            console.log('decoded token', req.decodedToken);
            
            next();
        }
    });
} else {
    res.status(401).json({ you: 'SHALL NOT PASS!' });
}
}
