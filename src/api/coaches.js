import { apiClient } from './index';

// coachesApi.js
// src/api/coaches.js
export const coachesApi = {
  getAll: () => apiClient.get('/coaches'),
  
  getById: (id) => apiClient.get(`/coaches/${id}`),
  
  create: (coachData) => {
    // Для FormData axios автоматически установит multipart/form-data
    return apiClient.post('/coaches', coachData);
  },
  
  update: (id, coachData) => {
    return apiClient.put(`/coaches/${id}`, coachData);
  },
  
  delete: (id) => apiClient.delete(`/coaches/${id}`),
};

// Функция для загрузки изображения
export const uploadCoachImage = async (file) => {
  const formData = new FormData();
  formData.append('photo', file);
  return formData;
};