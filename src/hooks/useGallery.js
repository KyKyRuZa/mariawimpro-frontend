import { useState, useCallback } from 'react';
import { galleryApi } from '../api/gallery';

export const useGallery = (coachId) => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadGallery = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const response = await galleryApi.getByCoachId(coachId);
      setGallery(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [coachId]);

  const addPhoto = useCallback(async (formData) => {
    try {
      setError('');
      const response = await galleryApi.add(coachId, formData);
      await loadGallery();
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [coachId, loadGallery]);

  const updatePhoto = useCallback(async (id, formData) => {
    try {
      setError('');
      const response = await galleryApi.update(id, formData);
      await loadGallery();
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [loadGallery]);

  const deletePhoto = useCallback(async (id) => {
    try {
      setError('');
      await galleryApi.delete(id);
      await loadGallery();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [loadGallery]);

  const updateOrder = useCallback(async (items) => {
    try {
      setError('');
      await galleryApi.updateOrder(items);
      await loadGallery();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [loadGallery]);

  return {
    gallery,
    loading,
    error,
    loadGallery,
    addPhoto,
    updatePhoto,
    deletePhoto,
    updateOrder,
    setError
  };
};