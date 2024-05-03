const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Read the user data from a JSON file
function findUserByPin(pin) {
    const usersPath = path.join(__dirname, 'users.json');
    const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
    return users.find(user => user.pin === pin);
}

router.post('/login', (req, res) => {
    const { pin } = req.body;
    const user = findUserByPin(pin);

    if (user) {
        res.json({
            username: user.username,
            role: user.role,
            message: 'Login successful'
        });
    } else {
        res.status(401).json({ message: 'Invalid PIN' });
    }
});

module.exports = router;
