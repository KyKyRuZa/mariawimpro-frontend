import { apiClient } from './index';

export const newsApi = {
  getAll: () => apiClient.get('/news'),

  getPromo: () => apiClient.get('/news/promo'),

  getById: (id) => apiClient.get(`/news/${id}`),

  create: (newsData) => {
    if (newsData instanceof FormData) {
      return apiClient.post('/news', newsData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    }
    
    return apiClient.post('/news', newsData);
  },

  update: (id, newsData) => {
    if (newsData instanceof FormData) {
      return apiClient.put(`/news/${id}`, newsData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    }
    
    return apiClient.put(`/news/${id}`, newsData);
  },

  delete: (id) => apiClient.delete(`/news/${id}`),
};