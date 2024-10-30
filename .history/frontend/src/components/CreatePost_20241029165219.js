import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        if (e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]); // Guarda la imagen seleccionada
        }
    };

    const handlePostSubmit = async (event) => {
        event.preventDefault();
    
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (selectedImage) {
            formData.append('image', selectedImage); // Asegúrate de que selectedImage esté definido
        }
    
        try {
            const response = await fetch('http://localhost:5000/api/posts', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Envía el token
                },
                body: formData, // Usa formData para enviar la imagen
            });
    
            if (response.ok) {
                // Si la publicación fue creada con éxito, redirige al inicio
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
                accept="image/*"
                onChange={handleImageChange} // Maneja el cambio de la imagen
            />
            <button type="submit">Crear Publicación</button>
        </form>
    );
};

export default CreatePost;
