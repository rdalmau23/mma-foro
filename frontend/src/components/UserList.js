import React, { useEffect, useState } from 'react';
import api from '../services/api';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        api.get('/users')
           .then((response) => setUsers(response.data))
           .catch((error) => console.error(error));
    }, []);

    return (
        <div>
            <h2>Usuarios</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.username} - {user.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
