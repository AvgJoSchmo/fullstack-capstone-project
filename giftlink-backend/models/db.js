// db.js
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

// MongoDB connection URL with authentication options
let url = `${process.env.MONGO_URL}`;

let dbInstance = null;
const dbName = "giftdb";

async function connectToDatabase() {
    if (dbInstance) {
        return dbInstance;
    }

    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

    // Task 1: Connect to MongoDB
    await client.connect(); // This line connects to the MongoDB server.

    // Task 2: Connect to database giftdb and store in variable dbInstance
    dbInstance = client.db(dbName); // This line accesses the specific database.

    // Task 3: Return database instance
    return dbInstance; // This line returns the connected database instance.
}

module.exports = connectToDatabase;
