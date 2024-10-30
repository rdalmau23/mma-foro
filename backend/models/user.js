// backend/models/user.js
const db = require('../config/database'); // Usa la conexión de la base de datos

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
