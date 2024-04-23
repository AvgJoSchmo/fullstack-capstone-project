/*jshint esversion: 8 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const pinoLogger = require('./logger');
const connectToDatabase = require('./models/db');

// Route imports
const giftRoutes = require('./routes/giftRoutes');
const authRoutes = require('./routes/authRoutes'); // Added authentication routes
const searchRoutes = require('./routes/searchRoutes');

const app = express();
app.use("*", cors());
const port = 3050; // Standardized port to match Gandorc's version

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files for React App from a subdirectory
app.use('/app', express.static(path.join(__dirname, 'public', 'react-app')));

// Connect to MongoDB; do this once at startup
connectToDatabase().then(() => {
    pinoLogger.info('Connected to DB');
}).catch((e) => {
    console.error('Failed to connect to DB', e);
});

app.use(express.json());

// Setup logger
const pinoHttp = require('pino-http');
const logger = require('./logger');
app.use(pinoHttp({ logger }));

// Use routes
app.use('/api/gifts', giftRoutes);
app.use('/api/auth', authRoutes); // Attach authentication routes
app.use('/api/search', searchRoutes);

// Route for Home Page - Serve home.html as the default page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Serve the React app's index.html for any other requests under /app
app.get('/app/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'react-app', 'index.html'));
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
