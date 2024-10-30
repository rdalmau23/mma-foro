// controllers/userController.js
const db = require('../config/database'); // Asegúrate de que la conexión a la base de datos esté bien configurada

exports.createUser = (req, res) => {
    const { username, email, password } = req.body;
    db.run(`INSERT INTO users (username, email, password) VALUES (?, ?, ?)`, 
           [username, email, password], function(err) {
        if (err) return res.status(500).json({ error: 'Error creating user' });
        res.status(201).json({ id: this.lastID, username, email });
    });
};

exports.getUsers = (req, res) => {
    db.all(`SELECT * FROM users`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: 'Error fetching users' });
        res.json(rows);
    });
};
