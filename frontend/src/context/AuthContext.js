// context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);
    const [username, setUsername] = useState(''); // Estado para el nombre de usuario

    const login = (token, user) => {
        setToken(token);
        setUsername(user); // Almacenar el nombre de usuario
        setIsAuthenticated(true);
        // Guarda el token y el nombre de usuario en el localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('username', user);
    };

    const logout = () => {
        setToken(null);
        setUsername(''); // Reiniciar el nombre de usuario
        setIsAuthenticated(false);
        localStorage.removeItem('token');
        localStorage.removeItem('username'); // Limpiar el nombre de usuario del localStorage
    };

    useEffect(() => {
        // Verificar si ya hay un token en el localStorage al cargar la aplicación
        const storedToken = localStorage.getItem('token');
        const storedUsername = localStorage.getItem('username'); // Obtener el nombre de usuario

        if (storedToken) {
            setToken(storedToken);
            setIsAuthenticated(true);
            setUsername(storedUsername || ''); // Establecer el nombre de usuario
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
