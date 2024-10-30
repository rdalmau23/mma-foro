// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import PostList from './components/PostList';
import UserList from './components/UserList';
import Login from './components/Login';
import Register from './components/Register';
import CreatePost from './components/CreatePost'; // Componente para crear publicaciones
import { AuthProvider } from './context/AuthContext'; // Importa el AuthProvider
import PrivateRoute from './components/PrivateRoute'; // Importa el componente PrivateRoute

function App() {
    return (
        <AuthProvider> {/* Provee el contexto de autenticación */}
            <Router>
                <div className="App">
                    <Header />
                    <h1>MMA Blog-Foro</h1>
                    <UserList />
                    <Routes>
                        <Route path="/" element={<PostList />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/create-post" element={
                            <PrivateRoute>
                                <CreatePost />
                            </PrivateRoute>
                        } /> {/* Ruta privada */}
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
