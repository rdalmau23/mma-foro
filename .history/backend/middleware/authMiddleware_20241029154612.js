// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log('Token recibido:', token); // Agrega este log para depurar

    if (!token) {
        return res.status(401).json({ message: 'No se proporcionó token' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token no válido' });
        }
        req.user = decoded;
        next();
    });
};


module.exports = authMiddleware;
