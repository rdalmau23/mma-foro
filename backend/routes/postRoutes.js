// backend/routes/postRoutes.js
const express = require('express');
const { createPost, getPosts, deletePost } = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware'); // Asegúrate de que este esté incluido
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

// Ruta para crear publicaciones
router.post('/', authMiddleware, upload.single('image'), createPost); // Incluye authMiddleware

// Ruta para obtener publicaciones
router.get('/', getPosts);

router.delete('/:id', authMiddleware, deletePost);

module.exports = router;
