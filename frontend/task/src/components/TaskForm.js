import React, { useState } from 'react';
import * as api from '../utils/api';

const TaskForm = ({ token, onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Low');
  const [category, setCategory] = useState('');

  const handleSubmit = async () => {
    const task = { title, description, dueDate, priority, category };
    const data = await api.createTask(token, task);
    if (data._id) {
      onTaskCreated(data);
      setTitle('');
      setDescription('');
      setDueDate('');
      setPriority('Low');
      setCategory('');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-6 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Create Task</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <button
        onClick={handleSubmit}
        className="w-full bg-green-500 text-white p-2 rounded"
      >
        Add Task
      </button>
    </div>
  );
};

export default TaskForm;