// backend/routes/postRoutes.js
const express = require('express');
const { createPost, getPosts } = require('../controllers/postController');
const upload = require('../middleware/uploadMiddleware'); // Asegúrate de que esto se importe correctamente

const router = express.Router();

// Ruta para crear publicaciones
router.post('/', upload.single('image'), createPost); // Comentar authMiddleware para probar

// Ruta para obtener publicaciones
router.get('/', getPosts);

module.exports = router;
