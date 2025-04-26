import React from 'react';

const TaskList = ({ tasks }) => (
  <div className="max-w-4xl mx-auto mt-6">
    <h2 className="text-xl font-bold mb-4">Tasks</h2>
    <div className="grid gap-4">
      {tasks.map((task) => (
        <div key={task._id} className="p-4 bg-white rounded shadow">
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <p>{task.description}</p>
          <p>Due: {task.dueDate}</p>
          <p>Priority: {task.priority}</p>
          <p>Category: {task.category}</p>
        </div>
      ))}
    </div>
  </div>
);

export default TaskList;