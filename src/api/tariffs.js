import { apiClient } from './index';

export const tariffsApi = {
  getAll: () => apiClient.get('/tariffs'),

  getById: (id) => apiClient.get(`/tariffs/${id}`),

  create: (tariffData) => apiClient.post('/tariffs', tariffData),

  update: (id, tariffData) => apiClient.patch(`/tariffs/${id}`, tariffData),

  updatePrice: (id, price) => apiClient.patch(`/tariffs/${id}/price`, { price }),

  delete: (id) => apiClient.delete(`/tariffs/${id}`),
};