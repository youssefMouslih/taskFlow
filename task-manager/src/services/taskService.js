import axios from 'axios';

const API_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// GET all tasks
export const getTasks = async () => {
  const response = await api.get('/tasks');
  return response.data;
};

// POST create task
export const createTask = async (task) => {
  const response = await api.post('/tasks', task);
  return response.data;
};

// PUT update task
export const updateTask = async (id, task) => {
  const response = await api.put(`/tasks/${id}`, task);
  return response.data;
};

// DELETE task
export const deleteTask = async (id) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};
