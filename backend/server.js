// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/todolist', {
  // @ts-ignore
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once('open', () => console.log('MongoDB connected'));

// Schema
const TaskSchema = new mongoose.Schema({
  text: String,
});
const Task = mongoose.model('Task', TaskSchema);

// Routes

// Read all
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Create
app.post('/tasks', async (req, res) => {
  const newTask = new Task({ text: req.body.text });
  await newTask.save();
  res.json(newTask);
});

// Update
app.put('/tasks/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, { text: req.body.text }, { new: true });
  res.json(task);
});

// Delete
app.delete('/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// Start server
app.listen(5000, () => console.log('Server started on http://localhost:5000'));
