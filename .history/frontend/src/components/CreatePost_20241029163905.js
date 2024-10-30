import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageFile, setImageFile] = useState(null); // Estado para el archivo de imagen
    const navigate = useNavigate();

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (selectedImage) { // Asegúrate de que la imagen esté definida
            formData.append('image', selectedImage);
        }
    
        try {
            const response = await fetch('http://localhost:5000/api/posts', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: formData, // Envía el FormData
            });
    
            if (response.ok) {
                navigate('/'); // Redirige a la página principal
            } else {
                console.error('Error al crear el post:', response.statusText);
            }
        } catch (error) {
            console.error('Error al enviar el post:', error);
        }
    };
    
    

    return (
        <form onSubmit={handlePostSubmit}>
            <input
                type="text"
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Contenido"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />
            <input
                type="file"
                onChange={(e) => setImageFile(e.target.files[0])}
            />
            <button type="submit">Publicar</button>
        </form>
    );
};

export default CreatePost;
