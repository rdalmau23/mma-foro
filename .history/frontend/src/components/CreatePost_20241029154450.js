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
        try {
            const token = localStorage.getItem('token'); // Ajusta esto según cómo guardas el token
            const response = await fetch('http://localhost:5000/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Asegúrate de incluir el token
                },
                body: JSON.stringify({
                    title,
                    content,
                    // si tienes imagen, también la debes enviar
                }),
            });
    
            if (!response.ok) {
                throw new Error(`Error al crear el post: ${response.statusText}`);
            }
    
            const data = await response.json();
            console.log('Post creado:', data);
            // Aquí puedes redirigir al inicio o hacer lo que necesites
        } catch (error) {
            console.error(error);
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
