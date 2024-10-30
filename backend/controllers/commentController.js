// controllers/commentController.js
const db = require('../config/database'); // Importa la conexión a la base de datos

// Crear un nuevo comentario
exports.createComment = (req, res) => {
    const { postId, content } = req.body; // Asegúrate de que el front-end envíe 'postId' y 'content'
    const userId = req.user.id; // Obtén el ID del usuario autenticado

    // Inserta el nuevo comentario en la base de datos
    db.run(`INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)`, [postId, userId, content], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, postId, userId, content }); // Devuelve el nuevo comentario creado como JSON
    });
};

// Obtener todos los comentarios de una publicación específica
exports.getComments = (req, res) => {
    const postId = req.params.postId; // Obtén el ID de la publicación de los parámetros de la solicitud

    db.all(`SELECT comments.*, users.username FROM comments JOIN users ON comments.user_id = users.id WHERE post_id = ?`, [postId], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows); // Devuelve la lista de comentarios como un JSON
    });
};
