import { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { getTasks, createTask, updateTask, deleteTask } from './api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load all tasks from the backend when the page first loads
  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch(() => setError('Could not load tasks. Is the backend running?'))
      .finally(() => setLoading(false));
  }, []);

  const handleError = (err) =>
    setError(err.response?.data?.message || 'Something went wrong. Please try again.');

  const handleAdd = async (title) => {
    try {
      const task = await createTask(title);
      setTasks((prev) => [task, ...prev]);
      setError('');
    } catch (err) {
      handleError(err);
    }
  };

  const handleUpdate = async (id, updates) => {
    try {
      const updated = await updateTask(id, updates);
      setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
      setError('');
    } catch (err) {
      handleError(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      setError('');
    } catch (err) {
      handleError(err);
    }
  };

  const remaining = tasks.filter((t) => !t.completed).length;

  return (
    <div className="app">
      <header>
        <h1>To-Do List</h1>
        <p className="subtitle">
          {tasks.length === 0
            ? 'No tasks yet'
            : `${remaining} of ${tasks.length} task${tasks.length === 1 ? '' : 's'} remaining`}
        </p>
      </header>

      <TaskForm onAdd={handleAdd} />

      {error && <div className="error">{error}</div>}

      {loading ? (
        <p className="empty">Loading tasks...</p>
      ) : (
        <TaskList tasks={tasks} onUpdate={handleUpdate} onDelete={handleDelete} />
      )}
    </div>
  );
}

export default App;
