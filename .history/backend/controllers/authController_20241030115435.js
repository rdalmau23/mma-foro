// backend/controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Ajusta la ruta según tu estructura

// Registro de usuario
exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        User.create(username, email, hashedPassword, (err, userId) => {
            if (err) {
                console.error('Error al registrar el usuario:', err);
                return res.status(400).json({ message: 'Error al registrar el usuario' });
            }
            console.log(`Usuario registrado con ID: ${userId}`);
            res.status(201).json({ message: 'Usuario registrado con éxito' });
        });
    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Inicio de sesión
exports.login = async (req, res) => {
    const { email, password } = req.body;

    User.findByEmail(email, async (err, user) => {
        if (err || !user) {
            console.error('Error al buscar el usuario:', err);
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log('Contraseña incorrecta para el usuario:', user.email);
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Generar el token JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        // Enviar el token al cliente
        res.json({ message: 'Inicio de sesión exitoso', token });
    });
};
