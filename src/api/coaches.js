import { apiClient } from './index';

export const coachesApi = {
  getAll: () => apiClient.get('/coaches'),
  
  getById: (id) => apiClient.get(`/coaches/${id}`),
  
  create: (coachData) => {
    return apiClient.post('/coaches', coachData);
  },
  
  update: (id, coachData) => {
    return apiClient.put(`/coaches/${id}`, coachData);
  },
  
  delete: (id) => apiClient.delete(`/coaches/${id}`),
};

export const uploadCoachImage = async (file) => {
  const formData = new FormData();
  formData.append('photo', file);
  return formData;
};