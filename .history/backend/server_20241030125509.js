require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes'); // Importar rutas de usuarios
const commentRoutes = require('./routes/commentRoutes'); // Importar rutas de comentarios

const app = express();
const PORT = process.env.PORT || 5000;

// Usar CORS
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes); // Ruta para publicaciones
app.use('/api/users', userRoutes); // Ruta para usuarios
app.use('/api/comments', commentRoutes); // Ruta para comentarios

app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});
