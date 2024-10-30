import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import PostList from './components/PostList';
import Login from './components/Login';
import Register from './components/Register';
import CreatePost from './components/CreatePost';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Footer from './components/Footer';
import './App.css';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="flex flex-col min-h-screen bg-gray-900 text-white">
                    <Header />
                    <main className="flex-grow max-w-5xl mx-auto w-full p-6"> {/* Cambiado a max-w-5xl para más ancho */}
                        <Routes>
                            <Route path="/" element={<PostList />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/create-post" element={
                                <PrivateRoute>
                                    <CreatePost />
                                </PrivateRoute>
                            } />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
