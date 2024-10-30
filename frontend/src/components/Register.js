import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState(''); // Definición de username
    const [email, setEmail] = useState(''); // Definición de email
    const [password, setPassword] = useState(''); // Definición de password
    const navigate = useNavigate(); // Importar y usar useNavigate

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (response.ok) {
                navigate('/login'); // Redirige a iniciar sesión después del registro
            } else {
                const data = await response.json();
                alert(data.message); // Muestra mensaje de error
            }
        } catch (error) {
            console.error('Error al registrarse:', error);
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <h2>Registrarse</h2>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)} // Manejo de estado para username
                placeholder="Nombre de usuario"
                required
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Manejo de estado para email
                placeholder="Email"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Manejo de estado para password
                placeholder="Contraseña"
                required
            />
            <button type="submit">Registrarse</button>
        </form>
    );
};

export default Register;
