import { apiClient } from './index';

class AuthService {
  setToken(token) {
    if (token) {
      localStorage.setItem('authToken', token);
      apiClient.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }

  getToken() {
    return localStorage.getItem('authToken');
  }

  removeToken() {
    localStorage.removeItem('authToken');
    delete apiClient.client.defaults.headers.common['Authorization'];
  }

  isAuthenticated() {
    const token = this.getToken();
    return !!token;
  }

  async register(login, password) {
    try {
      const response = await apiClient.post('/auth/register', { login, password });
      this.setToken(response.token);
      return response;
    } catch (error) {
      this.removeToken();
      throw error;
    }
  }

  async login(login, password) {
    try {
      const response = await apiClient.post('/auth/login', { login, password });
      this.setToken(response.token);
      return response;
    } catch (error) {
      this.removeToken();
      throw error;
    }
  }

  logout() {
    this.removeToken();
  }

}

export const authService = new AuthService();

const token = authService.getToken();
if (token) {
  authService.setToken(token);
}