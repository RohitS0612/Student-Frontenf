import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const studentsApi = {
  getAll: async () => {
    return await api.get('/students/all');
  },
  
  create: async (studentData) => {
    return await api.post('/students', studentData);
  },
  
  update: async (id, studentData) => {
    return await api.put(`/students/${id}`, studentData);
  },
  
  delete: async (id) => {
    return await api.delete(`/students/${id}`);
  }
};
