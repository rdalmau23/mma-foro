const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authenticateUser = require('../middleware/authMiddleware'); // Middleware para autenticación

// Crear un nuevo comentario
router.post('/comments', authenticateUser, commentController.createComment);

// Obtener todos los comentarios de una publicación específica
router.get('/posts/:postId/comments', commentController.getComments);

module.exports = router;
