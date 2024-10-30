// components/CreatePost.js
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate(); // Inicializa useNavigate

    const handlePostSubmit = async (e) => {
        e.preventDefault();

        // Lógica para enviar la nueva publicación
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);
            // Si tienes una imagen, asegúrate de incluirla también
            if (imageFile) { // Suponiendo que tienes `imageFile` en tu estado
                formData.append('image', imageFile);
            }
        
            const response = await fetch('http://localhost:5000/api/posts', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Añade el token al header
                },
                body: formData, // Envía el FormData
            });
        
            if (response.ok) {
                // Si la publicación fue creada con éxito, redirige al inicio
                navigate('/'); // Redirige a la página principal
            } else {
                // Manejo de errores, si es necesario
                console.error('Error al crear el post:', response.statusText);
            }
        } catch (error) {
            console.error('Error al enviar el post:', error);
        }
        
    };

    return (
        <div>
            {isAuthenticated ? (
                <form onSubmit={handlePostSubmit}>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Título"
                        required
                    />
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Contenido"
                        required
                    />
                    <button type="submit">Crear Post</button>
                </form>
            ) : (
                <p>Debes estar autenticado para crear un post.</p>
            )}
        </div>
    );
};

export default CreatePost;