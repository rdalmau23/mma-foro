import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
    
            if (response.status === 200) {
                const { token, username } = response.data; // Extrae también el `username` de la respuesta
                localStorage.setItem('token', token);
                localStorage.setItem('username', username); // Guarda el username en localStorage
                login(token, username); // Pasa el token y el username al contexto
                navigate('/'); // Redirigir al inicio después de iniciar sesión
            } else {
                console.error('Error de inicio de sesión:', response.data.message);
            }
        } catch (error) {
            console.error('Error al conectar con el servidor:', error);
            if (error.response) {
                console.error('Error de respuesta:', error.response.data);
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
