// backend/models/user.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )`);
});

const User = {
    create: (username, email, password, callback) => {
        db.run(`INSERT INTO users (username, email, password) VALUES (?, ?, ?)`, [username, email, password], function(err) {
            callback(err, this.lastID);
        });
    },
    findByEmail: (email, callback) => {
        db.get(`SELECT * FROM users WHERE email = ?`, [email], callback);
    },
};

module.exports = User;
