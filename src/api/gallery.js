import { apiClient } from './index';

class GalleryApi {
  // Получить все фотографии тренера
  getByCoachId(coachId) {
    return apiClient.get(`/gallery/coach/${coachId}`);
  }

  // Получить конкретную фотографию
  getById(id) {
    return apiClient.get(`/gallery/${id}`);
  }

  // Добавить фотографию в галерею
  add(coachId, formData) {
    return apiClient.post(`/gallery/coach/${coachId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  // Обновить фотографию
  update(id, formData) {
    return apiClient.put(`/gallery/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  // Удалить фотографию
  delete(id) {
    return apiClient.delete(`/gallery/${id}`);
  }

  // Обновить порядок фотографий
  updateOrder(items) {
    return apiClient.patch('/gallery/order', { items });
  }
}

export const galleryApi = new GalleryApi();