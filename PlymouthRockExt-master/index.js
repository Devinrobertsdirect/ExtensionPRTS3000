// index.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User'); // Adjust the path to your User model

const app = express();
const PORT = process.env.PORT || 3000;
const dbURI = 'your_mongodb_connection_uri';

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

// Example function to add a default moderator user
async function addDefaultModerator() {
    const existingModerator = await User.findOne({ username: 'moderatorUser' });
    if (!existingModerator) {
        const hashedPassword = await bcrypt.hash('moderatorPassword', 10); // Replace with a secure password
        const newModerator = new User({
            username: 'moderatorUser',
            password: hashedPassword,
            role: 'Moderator',
            pin: '4444' // Replace with a secure PIN
        });
        await newModerator.save();
        console.log('Default moderator user created');
    } else {
        console.log('Moderator user already exists');
    }
}

// Connect to MongoDB and add the default moderator user
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        addDefaultModerator();
    })
    .catch(err => console.error('MongoDB connection error:', err));

// Add your existing app routes and logic here

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
