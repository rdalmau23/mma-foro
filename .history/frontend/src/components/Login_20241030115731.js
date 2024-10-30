// components/Login.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Inicializar useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Lógica para autenticar al usuario
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const { token, username } = await response.json(); // Asegúrate de que la respuesta incluya el nombre de usuario
                login(token, username); // Pasar el token y el nombre de usuario al contexto
                navigate('/'); // Redirigir al inicio después de iniciar sesión
            } else {
                console.error('Error de inicio de sesión');
                // Aquí puedes mostrar un mensaje de error si lo deseas
            }
        } catch (error) {
            console.error('Error al conectar con el servidor', error);
            // Aquí también puedes manejar errores
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                required
            />
            <button type="submit">Iniciar sesión</button>
        </form>
    );
};

export default Login;
