// routes/userRoutes.js
const express = require('express');
const User = require('../User');
const  findUserByPin, updateUser, deleteUser } = require('./fileStorage');
const authenticateToken = require('../authMiddleware');
const router = express.Router();

// Middleware to restrict access to moderators
function restrictToModerator(req, res, next) {
    if (req.user.role !== 'Moderator') return res.status(403).json({ message: 'Access denied' });
    next();
}

// Get all users (moderator only)
router.get('/all', authenticateToken, restrictToModerator, async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// Get user by PIN
router.get('/:pin', (req, res) => {
    const { pin } = req.params;
    const user = findUserByPin(pin);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});
// Create or update user (moderator only)
router.post('/createOrUpdate', authenticateToken, restrictToModerator, async (req, res) => {
    const { _id, username, pin, password, role } = req.body;
    let user;

    if (_id) {
        user = await User.findByIdAndUpdate(_id, { username, pin, role }, { new: true });
    } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ username, pin, password: hashedPassword, role });
        await user.save();
    }

    // Update user
    router.put('/:pin', (req, res) => {
        const { pin } = req.params;
        const newData = req.body;
        updateUser(pin, newData);
        res.json({ message: 'User updated successfully' });
    });

    // Delete user
    router.delete('/:pin', (req, res) => {
        const { pin } = req.params;
        deleteUser(pin);
        res.json({ message: 'User deleted successfully' });
    });

    res.json(user);
});

// Delete a user (moderator only)
router.delete('/:id', authenticateToken, restrictToModerator, async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted successfully' });
});

module.exports = router;
