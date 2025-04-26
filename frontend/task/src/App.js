import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import * as api from './utils/api';

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showLogin, setShowLogin] = useState(true); // New state to toggle between Login and Register

  useEffect(() => {
    if (token) {
      api.getTasks(token).then((data) => setTasks(data));
    }
  }, [token]);

  const handleAuth = (newToken, newUser) => {
    setToken(newToken);
    setUser(newUser);
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    setTasks([]);
  };

  const handleTaskCreated = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div>
      <Navbar user={user} onLogout={handleLogout} />
      {!user ? (
        <div>
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setShowLogin(true)}
              className={`px-4 py-2 mr-2 rounded ${showLogin ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Login
            </button>
            <button
              onClick={() => setShowLogin(false)}
              className={`px-4 py-2 rounded ${!showLogin ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Register
            </button>
          </div>
          {showLogin ? (
            <Login onLogin={handleAuth} />
          ) : (
            <Register onRegister={handleAuth} />
          )}
        </div>
      ) : (
        <div>
          <TaskForm token={token} onTaskCreated={handleTaskCreated} />
          <TaskList tasks={tasks} />
        </div>
      )}
    </div>
  );
};

export default App;