// hooks/useTariffs.js

import { useState, useCallback, useRef } from 'react';
import { tariffsApi } from '../api/tariffs';
import { useApi } from './useApi';

export const useTariffs = () => {
  const [tariffs, setTariffs] = useState([]);
  const hasFetchedRef = useRef(false);
  const api = useApi();

  const fetchTariffs = useCallback(async (force = false) => {
    if (!force && hasFetchedRef.current) {
      return tariffs; // возвращаем текущее состояние
    }

    try {
      const response = await api.execute(tariffsApi.getAll);
      const tariffsData = Array.isArray(response) ? response : [];
      setTariffs(tariffsData);
      hasFetchedRef.current = true;
      return tariffsData;
    } catch (error) {
      console.error('Ошибка при загрузке тарифов:', error);
      hasFetchedRef.current = true;
      return [];
    }
  }, [api]); // Убрали `tariffs` из зависимостей

  const getTariff = useCallback(async (id) => {
    return api.execute(tariffsApi.getById, id);
  }, [api]);

  const createTariff = useCallback(async (tariffData) => {
    const result = await api.execute(tariffsApi.create, tariffData);
    // Важно: принудительно перезагружаем список, чтобы избежать проблем с кэшированием
    await fetchTariffs(true);
    return result;
  }, [api, fetchTariffs]);

  const updateTariff = useCallback(async (id, tariffData) => {
    const result = await api.execute(tariffsApi.update, id, tariffData);
    await fetchTariffs(true); // Принудительно обновляем данные
    return result;
  }, [api, fetchTariffs]);

  const updateTariffPrice = useCallback(async (id, price) => {
    const result = await api.execute(tariffsApi.updatePrice, id, price);
    await fetchTariffs(true);
    return result;
  }, [api, fetchTariffs]);

  const deleteTariff = useCallback(async (id) => {
    await api.execute(tariffsApi.delete, id);
    await fetchTariffs(true);
  }, [api, fetchTariffs]);

  return {
    tariffs,
    loading: api.loading,
    error: api.error,
    fetchTariffs: useCallback((force) => fetchTariffs(force), [fetchTariffs]),
    getTariff,
    createTariff,
    updateTariff,
    updateTariffPrice,
    deleteTariff,
    refresh: () => fetchTariffs(true),
  };
};