export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  TIMEOUT: 10000,
};

export const QUERY_KEYS = {
  COACHES: 'coaches',
  NEWS: 'news',
  TARIFFS: 'tariffs',
};