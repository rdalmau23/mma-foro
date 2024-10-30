import React, { useEffect, useState } from 'react';

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

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div>
            {error && <p>Error: {error}</p>}
            <h2>Publicaciones</h2>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;
