const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const { ObjectId } = require('mongodb'); // Required for converting ID from string to ObjectId
const connectToDatabase = require('../models/db'); // Adjust path as necessary to match your directory structure

// GET all gifts
router.get('/', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('gifts');
        const gifts = await collection.find({}).toArray();
        res.json(gifts);
    } catch (e) {
        console.error('Error fetching gifts:', e);
        res.status(500).send('Error fetching gifts');
    }
});

// GET a specific gift by ID
router.get('/:id', [
    param('id').isMongoId().withMessage('Invalid MongoDB ID') // Validate that ID is a valid MongoDB ObjectId
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const db = await connectToDatabase();
        const collection = db.collection('gifts');
        const id = req.params.id;
        const gift = await collection.findOne({ _id: new ObjectId(id) });
        if (!gift) {
            return res.status(404).send('Gift not found');
        }
        res.json(gift);
    } catch (e) {
        console.error('Error fetching gift:', e);
        res.status(500).send('Error fetching gift');
    }
});

// POST a new gift
router.post('/', [
    body('name').not().isEmpty().withMessage('Name cannot be empty').trim().escape(),
    body('description').not().isEmpty().withMessage('Description cannot be empty').trim().escape()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");
        const gift = await collection.insertOne(req.body);
        res.status(201).json(gift.ops[0]);
    } catch (e) {
        console.error('Error adding new gift:', e);
        res.status(500).send('Error adding new gift');
    }
});

module.exports = router;
