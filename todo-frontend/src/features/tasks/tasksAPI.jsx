import axios from 'axios';

const API_URL = 'http://localhost:8080/tasks';

export const fetchTasksAPI = () => axios.get(API_URL);
export const addTaskAPI = (task) => axios.post(API_URL, task);
export const deleteTaskAPI = (id) => axios.delete(`${API_URL}/${id}`);
export const markTaskAsDoneAPI = (id) => axios.post(`${API_URL}/${id}/done`);
export const searchTasksAPI = (keyword) => axios.get(`${API_URL}/search?keyword=${keyword}`);
export const fetchCompletedTasksAPI = () => axios.get(`${API_URL}/completed`);
