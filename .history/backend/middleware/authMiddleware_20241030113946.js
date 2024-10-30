const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next, decoded) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log('Token recibido:', token); // Log para verificar el token
    console.log('Datos decodificados:', decoded);

    if (!token) {
        return res.status(401).json({ message: 'No se proporcionó token' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token no válido' });
        }
        req.user = decoded; // Guarda la información del usuario en la solicitud
        console.log('Datos decodificados:', decoded); // Log para verificar los datos decodificados
        next(); // Llama al siguiente middleware o ruta
    });
};

module.exports = authMiddleware;
