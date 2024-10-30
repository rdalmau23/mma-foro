// Header.js
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; 

const Header = () => {
    const { isAuthenticated, username, logout } = useContext(AuthContext); // Obtener el contexto
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Estado para controlar el dropdown

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev); // Cambia el estado del dropdown
    };

    const handleLogout = () => {
        logout();
        setIsDropdownOpen(false); // Cierra el dropdown al cerrar sesión
    };

    return (
        <header className="w-full p-4 bg-gray-800 flex justify-between items-center">
            <h1 className="text-xl font-bold text-white">Fighting Gurú</h1>
            <nav>
                <ul className="flex space-x-4">
                    {isAuthenticated ? (
                        <>
                            <div className="relative">
                                <span 
                                    className="text-white cursor-pointer" 
                                    onClick={toggleDropdown} // Abre/cierra el dropdown al hacer clic
                                >
                                    {username}
                                </span>
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 bg-gray-700 text-white rounded shadow-lg z-10">
                                        <button 
                                            onClick={handleLogout} // Cierra sesión
                                            className="block px-4 py-2 hover:bg-gray-600"
                                        >
                                            Cerrar sesión
                                        </button>
                                    </div>
                                )}
                            </div>
                            <Link to="/" className="text-white">Inicio</Link>
                            <Link to="/create-post" className="text-white">Crear Publicación</Link>
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
