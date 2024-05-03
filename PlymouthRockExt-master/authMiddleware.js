//authMiddleware.js
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key';

function authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1]; // Bearer <token>
    if (!token) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;
