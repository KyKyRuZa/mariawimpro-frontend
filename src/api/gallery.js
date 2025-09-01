import { apiClient } from './index';

class GalleryApi {
  getByCoachId(coachId) {
    return apiClient.get(`/gallery/coach/${coachId}`);
  }
  
  getById(id) {
    return apiClient.get(`/gallery/${id}`);
  }

  add(coachId, formData) {
    return apiClient.post(`/gallery/coach/${coachId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  update(id, formData) {
    return apiClient.put(`/gallery/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  delete(id) {
    return apiClient.delete(`/gallery/${id}`);
  }

  updateOrder(items) {
    return apiClient.patch('/gallery/order', { items });
  }
}

export const galleryApi = new GalleryApi();