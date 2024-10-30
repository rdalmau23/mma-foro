// components/Login.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import axios from 'axios'; // Importar axios

const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Inicializar useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Lógica para autenticar al usuario
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const { token, username } = response.data; // Asegúrate de que la respuesta incluya el nombre de usuario
            login(token, username); // Pasar el token y el nombre de usuario al contexto
            navigate('/'); // Redirigir al inicio después de iniciar sesión
        } catch (error) {
            console.error('Error al conectar con el servidor', error);
            // Aquí puedes manejar errores, por ejemplo mostrando un mensaje de error
            if (error.response) {
                console.error('Error de respuesta:', error.response.data.message);
            } else {
                console.error('Error en la solicitud:', error.message);
            }
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
