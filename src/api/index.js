// src/api/client.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiClient {
  constructor(baseURL) {
    this.client = axios.create({
      baseURL,
    });

    this.client.interceptors.response.use(
      (response) => response.data,
      (error) => {
        console.error('API request failed:', error);
        const errorMessage = error.response?.data?.message || 
                            error.response?.data?.error || 
                            `HTTP error! status: ${error.response?.status}`;
        throw new Error(errorMessage);
      }
    );
  }

  async request(config) {
    return this.client.request(config);
  }

  get(endpoint) {
    return this.request({ method: 'GET', url: endpoint });
  }

  post(endpoint, data) {
    return this.request({ method: 'POST', url: endpoint, data });
  }

  put(endpoint, data) {
    return this.request({ method: 'PUT', url: endpoint, data });
  }

  patch(endpoint, data) {
    return this.request({ method: 'PATCH', url: endpoint, data });
  }

  delete(endpoint) {
    return this.request({ method: 'DELETE', url: endpoint });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);