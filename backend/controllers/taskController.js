const Task = require('../models/Task');

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ dueDate: 1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createTask = async (req, res) => {
  const { title, description, dueDate, priority, category } = req.body;

  try {
    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      category,
      user: req.user.id,
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, priority, category, completed } = req.body;

  try {
    let task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    task = await Task.findByIdAndUpdate(
      id,
      { title, description, dueDate, priority, category, completed },
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await task.remove();
    res.json({ message: 'Task removed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };