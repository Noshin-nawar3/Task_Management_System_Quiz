import React, { useState } from 'react';
import * as api from '../utils/api';

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      const data = await api.register(email, password, role);
      if (data.token) {
        onRegister(data.token, data.user);
      } else {
        setError('Registration failed');
      }
    } catch (err) {
      setError('Registration failed: ' + (err.message || 'Unknown error'));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Register
      </button>
    </div>
  );
};

export default Register;