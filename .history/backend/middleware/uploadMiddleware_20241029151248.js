// backend/middleware/uploadMiddleware.js
const multer = require('multer');
const path = require('path');

// Configuración de multer para manejar la carga de imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Carpeta donde se guardan las imágenes
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para el archivo
    },
});

const upload = multer({ storage });

module.exports = upload;
