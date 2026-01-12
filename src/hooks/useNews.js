import { useState, useCallback, useRef } from 'react';
import { newsApi } from '../api/news';
import { useApi } from './useApi';

export const useNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const hasFetchedRef = useRef(false);
  const isFetchingRef = useRef(false);
  
  const api = useApi();

  const fetchNews = useCallback(async (forceRefresh = false) => {
    if (isFetchingRef.current) return;
    if (hasFetchedRef.current && news.length > 0 && !forceRefresh) {
      return news;
    }
    
    isFetchingRef.current = true;
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.execute(newsApi.getAll);
      const newsData = response.data || [];
      setNews(newsData);
      hasFetchedRef.current = true;
      return newsData;
    } catch (error) {
      console.error('Ошибка при загрузке новостей:', error);
      setError(error);
      return [];
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, [api, news]);

  const fetchPromoNews = useCallback(async () => {
    return api.execute(newsApi.getPromo);
  }, [api]);

  const getNewsItem = useCallback(async (id) => {
    return api.execute(newsApi.getById, id);
  }, [api]);

  const createNews = useCallback(async (newsData) => {
    const result = await api.execute(newsApi.create, newsData);
    setNews(prev => [...prev, result.data]);
    hasFetchedRef.current = true;
    return result;
  }, [api]);

  const updateNews = useCallback(async (id, newsData) => {
    const result = await api.execute(newsApi.update, id, newsData);
    setNews(prev => prev.map(item => 
      item.id === id ? result.data : item
    ));
    return result;
  }, [api]);

  const deleteNews = useCallback(async (id) => {
    await api.execute(newsApi.delete, id);
    setNews(prev => prev.filter(item => item.id !== id));
  }, [api]);

  const refresh = useCallback(async () => {
    return fetchNews(true);
  }, [fetchNews]);

  return {
    news,
    loading: loading || api.loading,
    error: error || api.error,
    fetchNews,
    fetchPromoNews,
    getNewsItem,
    createNews,
    updateNews,
    deleteNews,
    refresh,
  };
};