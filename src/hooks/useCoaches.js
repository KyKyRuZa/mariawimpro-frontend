// src/hooks/useCoaches.js
import { useState, useEffect } from 'react';
import { coachesApi } from '../api/coaches';
import { useApi } from './useApi';

export const useCoaches = () => {
  const [coaches, setCoaches] = useState([]);
  const api = useApi();

  const fetchCoaches = async () => {
    try {
      const result = await api.execute(coachesApi.getAll);
      setCoaches(result.data || result); // В зависимости от структуры ответа
      return result;
    } catch (error) {
      console.error('Error fetching coaches:', error);
      throw error;
    }
  };

  const getCoach = async (id) => {
    return api.execute(coachesApi.getById, id);
  };

  const createCoach = async (coachData) => {
    try {
      const result = await api.execute(coachesApi.create, coachData);
      setCoaches(prev => [...prev, result.data || result]);
      return result;
    } catch (error) {
      console.error('Error creating coach:', error);
      throw error;
    }
  };

  const updateCoach = async (id, coachData) => {
    try {
      const result = await api.execute(coachesApi.update, id, coachData);
      setCoaches(prev => prev.map(coach => 
        coach.id === id ? (result.data || result) : coach
      ));
      return result;
    } catch (error) {
      console.error('Error updating coach:', error);
      throw error;
    }
  };

  const deleteCoach = async (id) => {
    try {
      await api.execute(coachesApi.delete, id);
      setCoaches(prev => prev.filter(coach => coach.id !== id));
    } catch (error) {
      console.error('Error deleting coach:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchCoaches();
  }, []);

  return {
    coaches: coaches,
    loading: api.loading,
    error: api.error,
    fetchCoaches,
    getCoach,
    createCoach,
    updateCoach,
    deleteCoach,
    refresh: fetchCoaches,
  };
};