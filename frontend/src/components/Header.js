// components/Header.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Asegúrate de que la ruta sea correcta

const Header = () => {
    const { isAuthenticated, username, logout } = useContext(AuthContext); // Obtener el contexto

    return (
        <header className="p-4 bg-gray-800 text-white">
            <h1 className="text-xl font-bold">MMA Blog-Foro</h1>
            <nav>
                <ul className="flex space-x-4">
                    {isAuthenticated ? (
                        <>
                            
                                <span>Bienvenido, {username}!</span> {/* Mostrar el nombre de usuario */}
                            
                            
                                <button onClick={logout} className="text-blue-400">Cerrar sesión</button>
                            
                            <Link to="/">Inicio</Link>
                            <Link to="/create-post">Crear Publicación</Link>
                        </>
                    ) : (
                        <>
                            
                                <Link to="/login" className="text-blue-400">Iniciar sesión</Link>
                            
                            
                                <Link to="/register" className="text-blue-400">Registrarse</Link>
                            
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
