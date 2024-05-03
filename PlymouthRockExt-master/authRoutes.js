// In routes/authRoutes.js or routes/userRoutes.js
const User = require('../User');
const express = require('express');
const { addUser, findUserByPin } = require('./memoryStorage');
const { addUser, findUserByPin } = require('./fileStorage');
const User = require('../User');
const authenticateToken = require('../authMiddleware');
const router = express.Router();

// Get all users
router.get('/', authenticateToken, async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// Update a user
router.put('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedUser);
});

// Delete a user
router.delete('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted successfully' });
});
// Login via PIN
router.post('/login', async (req, res) => {
    const { pin } = req.body;
    const user = await User.findOne({ pin });

    if (!user) {
        return res.status(401).json({ message: 'Invalid PIN' });
    }

    // Log IP address and time
    user.ipAddress = req.ip;
    user.lastLogin = new Date();
    await user.save();


    router.post('/login', async (req, res) => {
        const { pin } = req.body;
        const user = await User.findOne({ pin });

        if (!user) return res.status(401).json({ message: 'Invalid PIN' });

        user.ipAddress = req.ip;
        user.lastLogin = new Date();
        await user.save();

        const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token, username: user.username, role: user.role, lastLogin: user.lastLogin, ipAddress: user.ipAddress });
    });

    // Signup route to add a new user
    router.post('/signup', (req, res) => {
        const { username, password, pin, role } = req.body;
        addUser({ username, password, pin, role });
        res.status(201).json({ message: 'User created successfully' });
    });

    // Login route to authenticate a user by PIN
    router.post('/login', (req, res) => {
        const { pin } = req.body;
        const user = findUserByPin(pin);
        if (user) {
            res.json({ message: `Welcome, ${user.username}`, role: user.role });
        } else {
            res.status(401).json({ message: 'Invalid PIN' });
        }
    });

    // Example endpoint to add a user
    router.post('/signup', (req, res) => {
        const { username, password, pin, role } = req.body;
        addUser({ username, password, pin, role });
        res.status(201).json({ message: 'User created successfully' });
    });

    // Example endpoint to login via pin
    router.post('/login', (req, res) => {
        const { pin } = req.body;
        const user = findUserByPin(pin);
        if (user) {
            res.json({ message: `Welcome, ${user.username}` });
        } else {
            res.status(401).json({ message: 'Invalid PIN' });
        }
    });

        // Log IP address and time
        user.ipAddress = req.ip;
        user.lastLogin = new Date();
        await user.save();

        console.log('Login successful:', user);

        const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token, username: user.username, lastLogin: user.lastLogin, ipAddress: user.ipAddress });
    });

    const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token, username: user.username, lastLogin: user.lastLogin, ipAddress: user.ipAddress });
});

module.exports = router;