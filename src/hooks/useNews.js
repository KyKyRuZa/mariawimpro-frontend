// src/hooks/useNews.js
import { useState, useCallback } from 'react';
import { newsApi } from '../api/news';
import { useApi } from './useApi';

export const useNews = () => {
  const [news, setNews] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);
  const api = useApi();

  const fetchNews = useCallback(async () => {
    if (hasFetched && news.length > 0) {
      return news;
    }
    
    try {
      const response = await api.execute(newsApi.getAll);
      if (response && response.data && !Array.isArray(response.data)) {
        console.error('Ожидался массив, но получен:', response.data);
        return [];
      }
      const newsData = response.data || [];
      setNews(newsData);
      setHasFetched(true);
      return newsData;
    } catch (error) {
      console.error('Ошибка при загрузке новостей:', error);
      setHasFetched(true);
      return [];
    }
  }, [api, hasFetched, news.length]);

  const fetchPromoNews = useCallback(async () => {
    return api.execute(newsApi.getPromo);
  }, [api]);

  const getNewsItem = useCallback(async (id) => {
    return api.execute(newsApi.getById, id);
  }, [api]);

  const createNews = useCallback(async (newsData) => {
    const result = await api.execute(newsApi.create, newsData);
    setNews(prev => [...prev, result.data]);
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

  return {
    news,
    loading: api.loading,
    error: api.error,
    fetchNews,
    fetchPromoNews,
    getNewsItem,
    createNews,
    updateNews,
    deleteNews,
    refresh: fetchNews,
  };
};