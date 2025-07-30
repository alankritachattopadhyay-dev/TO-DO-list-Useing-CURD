// @ts-nocheck
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:5000/tasks');
    setTasks(res.data);
  };

  const handleAddOrUpdate = async () => {
    if (editId) {
      await axios.put(`http://localhost:5000/tasks/${editId}`, { text });
      setEditId(null);
    } else {
      await axios.post('http://localhost:5000/tasks', { text });
    }
    setText('');
    fetchTasks();
  };

  const handleEdit = (task) => {
    setText(task.text);
    setEditId(task._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div className="App">
      <h1>,MY TODO LIST</h1>
      <input
        type="text"
        placeholder="Enter task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleAddOrUpdate}>{editId ? 'Update' : 'Add'}</button>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.text}
            <button onClick={() => handleEdit(task)}>Edit</button>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
