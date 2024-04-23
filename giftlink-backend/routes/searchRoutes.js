const express = require('express');
const router = express.Router();
const connectToDatabase = require('../models/db');

// Search for gifts
router.get('/', async (req, res, next) => {
    try {
        // Task 1: Connect to MongoDB using connectToDatabase. Store the connection in `db`
        const db = await connectToDatabase();  

        const collection = db.collection("gifts");

        // Initialize the query object
        let query = {};

        // Task 2: Check if the name exists and is not empty
        if (req.query.name && req.query.name.trim() !== '') {
            query.name = { $regex: req.query.name, $options: "i" }; 
        }

        // Task 3: Add other filters to the query
        if (req.query.category) {
            query.category = req.query.category;  // Added category filter to the query
        }
        if (req.query.condition) {
            query.condition = req.query.condition;  // Added condition filter to the query
        }
        if (req.query.age_years) {
            query.age_years = { $lte: parseInt(req.query.age_years) };  // Added age filter to the query, converting age to integer
        }

        // Task 4: Fetch filtered gifts using the find(query) method
        const gifts = await collection.find(query).toArray();  

        res.json(gifts);  
    } catch (e) {
        next(e);  
    }
});

module.exports = router;