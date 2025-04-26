import React, { useState } from 'react';
import * as api from '../utils/api';

const TaskDetails = ({ task, token, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [dueDate, setDueDate] = useState(task.dueDate ? task.dueDate.split('T')[0] : '');
  const [priority, setPriority] = useState(task.priority);
  const [category, setCategory] = useState(task.category || '');
  const [completed, setCompleted] = useState(task.completed);

  const handleUpdate = async () => {
    const updatedTask = { title, description, dueDate, priority, category, completed };
    const data = await api.updateTask(token, task._id, updatedTask);
    if (data._id) {
      onUpdate(data);
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    await api.deleteTask(token, task._id);
    onDelete(task._id);
  };

  const toggleComplete = async () => {
    const updatedTask = { ...task, completed: !completed };
    const data = await api.updateTask(token, task._id, updatedTask);
    if (data._id) {
      setCompleted(!completed);
      onUpdate(data);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow max-w-md mx-auto mt-4">
      {isEditing ? (
        <div>
          <h3 className="text-lg font-semibold mb-2">Edit Task</h3>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white p-2 rounded mr-2"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-500 text-white p-2 rounded"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <p>{task.description}</p>
          <p>Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</p>
          <p>Priority: {task.priority}</p>
          <p>Category: {task.category || 'N/A'}</p>
          <p>Status: {task.completed ? 'Completed' : 'Incomplete'}</p>
          <button
            onClick={toggleComplete}
            className={`p-2 rounded text-white ${task.completed ? 'bg-yellow-500' : 'bg-green-500'} mr-2`}
          >
            {task.completed ? 'Mark as Incomplete' : 'Mark as Completed'}
          </button>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white p-2 rounded mr-2"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white p-2 rounded"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskDetails;