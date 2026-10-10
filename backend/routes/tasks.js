const express = require('express');
const mongoose = require('mongoose');
const Task = require('../models/Task');

const router = express.Router();

// Reject malformed ids before they reach Mongoose
const validateId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid task id' });
  }
  next();
};

// GET /api/tasks — fetch all tasks (newest first)
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/tasks — add a new task
router.post('/', async (req, res) => {
  try {
    const { title } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Task title is required' });
    }
    const task = await Task.create({ title });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/tasks/:id — update title and/or completed status
router.put('/:id', validateId, async (req, res) => {
  try {
    const updates = {};
    if (req.body.title !== undefined) {
      if (!String(req.body.title).trim()) {
        return res.status(400).json({ message: 'Task title cannot be empty' });
      }
      updates.title = req.body.title;
    }
    if (req.body.completed !== undefined) {
      updates.completed = Boolean(req.body.completed);
    }

    const task = await Task.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/tasks/:id — delete a task
router.delete('/:id', validateId, async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted', id: task._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
