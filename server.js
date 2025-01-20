// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize SQLite database
const db = new sqlite3.Database(':memory:');

// Create messages table
db.serialize(() => {
    db.run("CREATE TABLE messages (id INTEGER PRIMARY KEY AUTOINCREMENT, user TEXT, message TEXT)");
});

// Endpoint to send a message
app.post('/api/messages', (req, res) => {
    const { user, message } = req.body;
    db.run("INSERT INTO messages (user, message) VALUES (?, ?)", [user, message], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, user, message });
    });
});

// Endpoint to retrieve messages
app.get('/api/messages', (req, res) => {
    db.all("SELECT * FROM messages", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});