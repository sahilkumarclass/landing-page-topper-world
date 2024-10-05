const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = process.env.PORT || 5001;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define a simple schema and model
const ItemSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    confirmpassword: String
});

const Item = mongoose.model('Item', ItemSchema);

// Serve HTML pages
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'index.html'));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'login.html'));
});

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'register.html'));
});

// API route to create an item
app.post('/api/items', async (req, res) => {
    const newItem = new Item(req.body);
    try {
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// API route to get all items
app.get('/api/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
