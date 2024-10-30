const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directorio donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para el archivo
    },
});

const upload = multer({ storage });

module.exports = upload; // Asegúrate de exportar correctamente

console.log('Token recibido:', token);
console.log('Datos decodificados:', decoded);