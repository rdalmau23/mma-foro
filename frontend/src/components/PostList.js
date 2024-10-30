import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    const fetchPosts = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/posts');
            if (!response.ok) {
                throw new Error('Error al obtener publicaciones');
            }
            const data = await response.json();
            setPosts(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeletePost = async (postId) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta publicación?')) {
            try {
                const response = await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (response.status === 200) {
                    // Elimina el post del estado local
                    setPosts(posts.filter(post => post.id !== postId));
                } else {
                    console.error('Error al eliminar la publicación:', response.statusText);
                }
            } catch (error) {
                console.error('Error al enviar la solicitud de eliminación:', error);
                if (error.response) {
                    console.error('Error de respuesta:', error.response.data);
                } else {
                    console.error('Error en la solicitud:', error.message);
                }
            }
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="max-w-3xl mx-auto p-6 bg-gray-900">
            {error && <p className="text-red-600 mb-4">Error: {error}</p>}
            <h2 className="text-3xl font-bold text-white mb-6">Publicaciones</h2>
            <ul className="space-y-4">
                {posts.map(post => (
                    <li key={post.id} className="p-4 bg-white border border-gray-200 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-indigo-700 mb-2">{post.title}</h3>
                        <p className="text-gray-600">{post.content}</p>
                        <button
                            onClick={() => handleDeletePost(post.id)}
                            className="mt-2 text-red-600 hover:text-red-800 transition duration-200 ease-in-out"
                        >
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;
