const BASE_URL = 'http://localhost:5000/api';

const register = async (email, password, role) => {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, role }),
  });
  return response.json();
};

const login = async (email, password) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

const getTasks = async (token) => {
  const response = await fetch(`${BASE_URL}/tasks`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return response.json();
};

const createTask = async (token, task) => {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });
  return response.json();
};

const updateTask = async (token, taskId, task) => {
  const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });
  return response.json();
};

const deleteTask = async (token, taskId) => {
  const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.json();
};

export { register, login, getTasks, createTask, updateTask, deleteTask };