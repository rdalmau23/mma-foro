// components/CreatePost.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importar axios

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
            const response = await axios.post('http://localhost:5000/api/posts', formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Envía el token
                    'Content-Type': 'multipart/form-data', // Asegúrate de que el tipo de contenido sea multipart
                },
            });
    
            if (response.status === 201) { // Verifica si la creación fue exitosa
                navigate('/'); // Redirige a la página principal
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
