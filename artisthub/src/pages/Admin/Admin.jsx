import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAllUsers } from '../../services/apiCalls';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers(token);
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [token]);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>All Users</h2>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              {/* Otros detalles del usuario */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
};

export default Admin;