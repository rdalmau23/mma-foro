// backend/routes/postRoutes.js
const express = require('express');
const { createPost, getPosts } = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware'); // Asegúrate de que esto se importe correctamente

const router = express.Router();

// Ruta para crear publicaciones
router.post('/', authMiddleware, upload.single('image'), createPost); // Usa el middleware de autenticación y de carga

// Ruta para obtener publicaciones
router.get('/', getPosts);

module.exports = router;
