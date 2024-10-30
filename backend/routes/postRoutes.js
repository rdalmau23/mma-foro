// backend/routes/postRoutes.js
const express = require('express');
const { createPost, getPosts } = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware'); // Asegúrate de que este esté incluido
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

// Ruta para crear publicaciones
router.post('/', authMiddleware, upload.single('image'), createPost); // Incluye authMiddleware

// Ruta para obtener publicaciones
router.get('/', getPosts);

module.exports = router;
