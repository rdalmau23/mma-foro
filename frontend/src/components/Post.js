import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Asegúrate de tener este contexto

const Post = ({ post }) => {
    const { isAuthenticated } = useContext(AuthContext); // Obtener el estado de autenticación
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(post.comments || []);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        
        if (comment.trim()) {
            try {
                const response = await fetch(`http://localhost:5000/api/comments`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ postId: post.id, text: comment }),
                });

                if (response.ok) {
                    const newComment = await response.json();
                    setComments([...comments, newComment]);
                    setComment('');
                } else {
                    console.error("Error al agregar comentario:", response.statusText);
                }
            } catch (error) {
                console.error("Error al agregar comentario:", error);
            }
        }
    };

    return (
        <article className="mb-6 p-4 border border-gray-300 rounded">
            <h3 className="text-lg font-semibold">{post.title}</h3>
            <p>{post.content}</p>
            <section className="mt-4">
                <h4 className="font-bold">Comentarios:</h4>
                {comments.map((c, index) => (
                    <p key={index} className="pl-4 text-gray-600">- {c.text}</p>
                ))}
                
                {isAuthenticated ? ( // Solo mostrar el formulario si el usuario está autenticado
                    <form onSubmit={handleCommentSubmit} className="mt-2">
                        <input
                            type="text"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Añadir un comentario"
                            className="border rounded p-1 w-full"
                        />
                        <button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded">
                            Comentar
                        </button>
                    </form>
                ) : (
                    <p className="mt-2 text-red-600">Debes estar autenticado para comentar.</p> // Mensaje para no autenticados
                )}
            </section>
        </article>
    );
};

export default Post;
