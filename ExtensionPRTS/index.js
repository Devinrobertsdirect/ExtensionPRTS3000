// index.js
const express = require('express');
const mongoose = require('mongoose');
const appRoutes = require('./routes/appRoutes');
const app = express();

const PORT = process.env.PORT || 3000;

// Correct MongoDB connection URI
const dbURI = 'mongodb://atlas-sql-663271fe9c777c7084e4fab5-2xhvk.a.query.mongodb.net/sample_mflix?ssl=true&authSource=admin'
mongoose.connect(dbURI, {
    useNewUrlParser: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));
;

// Connect to MongoDB
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Middleware to parse JSON bodies
app.use(express.json());

// Use routes from appRoutes
app.use('/api', appRoutes);

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Sales Management Backend Server is running');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
