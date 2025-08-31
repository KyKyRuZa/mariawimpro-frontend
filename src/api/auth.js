import { apiClient } from './index';

class AuthService {
  // Сохраняем токен в localStorage
  setToken(token) {
    if (token) {
      localStorage.setItem('authToken', token);
      // Устанавливаем токен в заголовки axios
      apiClient.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }

  // Получаем токен из localStorage
  getToken() {
    return localStorage.getItem('authToken');
  }

  // Удаляем токен
  removeToken() {
    localStorage.removeItem('authToken');
    delete apiClient.client.defaults.headers.common['Authorization'];
  }

  // Проверяем, авторизован ли пользователь
  isAuthenticated() {
    const token = this.getToken();
    return !!token;
  }

  // Регистрация
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

  // Вход
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

  // Выход
  logout() {
    this.removeToken();
    // Можно добавить вызов API для инвалидации токена на сервере, если нужно
  }

}

export const authService = new AuthService();

// Инициализируем токен при загрузке приложения
const token = authService.getToken();
if (token) {
  authService.setToken(token);
}