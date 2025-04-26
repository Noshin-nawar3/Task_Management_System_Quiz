import React from 'react';

const Navbar = ({ user, onLogout }) => (
  <nav className="bg-blue-600 p-4 text-white flex justify-between">
    <h1 className="text-lg font-bold">Task Management System</h1>
    {user && (
      <button onClick={onLogout} className="bg-red-500 px-4 py-2 rounded">
        Logout
      </button>
    )}
  </nav>
);

export default Navbar;