// backend/controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Ajusta la ruta según tu estructura

exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        User.create(username, email, hashedPassword, (err, userId) => {
            if (err) {
                console.error('Error al registrar el usuario:', err); // Agregado
                return res.status(400).json({ message: 'Error al registrar el usuario' });
            }
            console.log(`Usuario registrado con ID: ${userId}`); // Agregado
            res.status(201).json({ message: 'Usuario registrado con éxito' });
        });
    } catch (error) {
        console.error('Error en el servidor:', error); // Agregado
        res.status(500).json({ message: 'Error en el servidor' });
    }
};


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

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log(token);
        // Envía el token y el username en la respuesta
        res.json({ message: 'Inicio de sesión exitoso', token, username: user.username });
    });
};

