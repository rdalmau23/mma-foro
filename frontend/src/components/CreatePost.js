// components/CreatePost.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        if (e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const handlePostSubmit = async (event) => {
        event.preventDefault();
    
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (selectedImage) {
            formData.append('image', selectedImage);
        }
    
        try {
            const response = await axios.post('http://localhost:5000/api/posts', formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (response.status === 201) {
                navigate('/');
            } else {
                console.error('Error al crear el post:', response.statusText);
            }
        } catch (error) {
            console.error('Error al enviar el post:', error);
            if (error.response) {
                console.error('Error de respuesta:', error.response.data);
            } else {
                console.error('Error en la solicitud:', error.message);
            }
        }
    };
    
    return (
        <form onSubmit={handlePostSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Crear Nueva Publicación</h2>
            <input
                type="text"
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <textarea
                placeholder="Contenido"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 h-40 resize-none"
            />
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            <button
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-200 ease-in-out"
            >
                Crear Publicación
            </button>
        </form>
    );
};

export default CreatePost;
