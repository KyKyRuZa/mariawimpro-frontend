// src/api/tariffs.js
import { apiClient } from './index';

export const tariffsApi = {
  // Получить все тарифы
  getAll: () => apiClient.get('/tariffs'),

  // Получить тариф по ID
  getById: (id) => apiClient.get(`/tariffs/${id}`),

  // Создать тариф
  create: (tariffData) => apiClient.post('/tariffs', tariffData),

  // Обновить тариф полностью
  update: (id, tariffData) => apiClient.patch(`/tariffs/${id}`, tariffData),

  // Обновить только цену тарифа
  updatePrice: (id, price) => apiClient.patch(`/tariffs/${id}/price`, { price }),

  // Удалить тариф
  delete: (id) => apiClient.delete(`/tariffs/${id}`),
};