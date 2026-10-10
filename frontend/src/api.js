import axios from 'axios';

// All task requests go through the Vite proxy to http://localhost:5000/api/tasks
const api = axios.create({ baseURL: '/api/tasks' });

export const getTasks = () => api.get('/').then((res) => res.data);
export const createTask = (title) => api.post('/', { title }).then((res) => res.data);
export const updateTask = (id, updates) => api.put(`/${id}`, updates).then((res) => res.data);
export const deleteTask = (id) => api.delete(`/${id}`).then((res) => res.data);
