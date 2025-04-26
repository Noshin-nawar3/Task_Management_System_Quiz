import React, { useState } from 'react';
import * as api from '../utils/api';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      const data = await api.login(email, password);
      if (data.token) {
        onLogin(data.token, data.user);
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
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
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Login
      </button>
    </div>
  );
};

export default Login;