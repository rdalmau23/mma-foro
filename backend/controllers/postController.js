const multer = require('multer');
const path = require('path');
const db = require('../config/database'); // Importa la conexión a la base de datos

// Configuración de multer para almacenar imágenes en el servidor
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Carpeta donde se almacenarán las imágenes
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para cada archivo
    },
});

// Inicializar multer
const upload = multer({ storage });

// Crear una nueva publicación
exports.createPost = (req, res) => {
    const { title, content } = req.body; // Extrae el título y contenido del cuerpo de la solicitud
    const image = req.file ? req.file.path : null; // Obtén la ruta de la imagen si se ha subido

    // Asegúrate de que req.user está definido
    if (!req.user || !req.user.userId) {
        console.log('req.user:', req.user);
        return res.status(403).json({ message: 'Usuario no autenticado' });
    }

    const userId = req.user.userId; // Obtén el ID del usuario autenticado
    const newPost = { title, content, image, user_id: userId };

    console.log('Título:', title);
    console.log('Contenido:', content);
    console.log('ID del usuario:', userId);
    console.log('Imagen:', image); // Log para verificar la imagen

    // Insertar en la base de datos
    db.run(
        `INSERT INTO posts (title, content, image, user_id) VALUES (?, ?, ?, ?)`,
        [title, content, image, userId],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ id: this.lastID, ...newPost }); // Devuelve el nuevo post creado como JSON
        }
    );
};

exports.deletePost = (req, res) => {
    const postId = req.params.id; // Obtiene el ID de la publicación a eliminar
    const userId = req.user.userId; // Obtén el ID del usuario autenticado

    // Verificar si la publicación pertenece al usuario
    db.get(`SELECT * FROM posts WHERE id = ?`, [postId], (err, post) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!post) {
            return res.status(404).json({ message: 'Publicación no encontrada.' });
        }
        if (post.user_id !== userId) {
            return res.status(403).json({ message: 'No tienes permiso para eliminar esta publicación.' });
        }

        // Si la publicación existe y pertenece al usuario, eliminarla
        db.run(`DELETE FROM posts WHERE id = ?`, [postId], function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ message: 'Publicación eliminada con éxito.' });
        });
    });
};
// Obtener todas las publicaciones
exports.getPosts = (req, res) => {
    db.all(
        `SELECT posts.*, users.username FROM posts JOIN users ON posts.user_id = users.id`,
        [],
        (err, rows) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json(rows); // Devuelve la lista de publicaciones como un JSON
        }
    );
};

// Exporta el middleware de carga de archivos
exports.upload = upload;
