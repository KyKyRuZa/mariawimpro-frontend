// src/api/news.js
import { apiClient } from './index';

export const newsApi = {
  // Получить все новости
  getAll: () => apiClient.get('/news'),

  // Получить промо-новости
  getPromo: () => apiClient.get('/news/promo'),

  // Получить новость по ID
  getById: (id) => apiClient.get(`/news/${id}`),

  // Создать новость
  create: (newsData) => {
    // Если newsData содержит FormData (например, с изображением), используем multipart/form-data
    if (newsData instanceof FormData) {
      return apiClient.post('/news', newsData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    }
    
    // Иначе используем стандартный JSON
    return apiClient.post('/news', newsData);
  },

  // Обновить новость
  update: (id, newsData) => {
    // Если newsData содержит FormData (например, с изображением), используем multipart/form-data
    if (newsData instanceof FormData) {
      return apiClient.put(`/news/${id}`, newsData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    }
    
    // Иначе используем стандартный JSON
    return apiClient.put(`/news/${id}`, newsData);
  },

  // Удалить новость
  delete: (id) => apiClient.delete(`/news/${id}`),
};