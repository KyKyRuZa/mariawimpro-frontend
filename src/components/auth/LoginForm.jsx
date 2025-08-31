import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { authService } from '../../api/auth'; // Импортируем сервис аутентификации
import '../../styles/login.css'


const LoginForm = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!login.trim() || !password.trim()) {
      setError('Все поля обязательны для заполнения');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      // Вызываем метод login из AuthService
      await authService.login(login, password);
      
      const from = location.state?.from?.pathname || '/admin';
      
      setSuccess('Вход выполнен успешно!');
      
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1000);
      
    } catch (err) {
      // Обрабатываем ошибки из AuthService
      let errorMessage = 'Произошла неизвестная ошибка';
      
      if (err.response) {
        // Ошибка от сервера с кодом статуса
        switch (err.response.status) {
          case 401:
            errorMessage = 'Неверный логин или пароль';
            break;
          case 404:
            errorMessage = 'Сервер авторизации недоступен';
            break;
          case 500:
            errorMessage = 'Внутренняя ошибка сервера';
            break;
          default:
            errorMessage = err.response.data?.message || `Ошибка сервера: ${err.response.status}`;
        }
      } else if (err.request) {
        // Запрос был сделан, но ответ не получен
        errorMessage = 'Нет соединения с сервером. Проверьте интернет-соединение';
      } else {
        // Что-то пошло не так при настройке запроса
        errorMessage = err.message || 'Ошибка при отправке запроса';
      }
      
      setError(errorMessage);
      setPassword('');
      
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleSubmit(e);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Вход в систему</h2>
        
        {success && (
          <div className="alert alert-success" role="alert">
            {success}
          </div>
        )}
        
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        
        <div className="form-group">
          <label htmlFor="login" className="form-label">
            Логин *
          </label>
          <input
            type="text"
            className={`form-control ${error && !login.trim() ? 'input-error' : ''}`}
            id="login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            disabled={loading}
            placeholder="Введите ваш логин"
            autoComplete="username"
            required
          />
          {error && !login.trim() && <div className="error-text">Это поле обязательно</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Пароль *
          </label>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              className={`form-control ${error && !password.trim() ? 'input-error' : ''}`}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
              placeholder="Введите ваш пароль"
              autoComplete="current-password"
              required
            />
            <button 
              type="button" 
              className="toggle-password"
              onClick={togglePasswordVisibility}
              tabIndex="-1"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
          {error && !password.trim() && <div className="error-text">Это поле обязательно</div>}
        </div>
        
        <button
          type="submit"
          className="btn btn-login"
          disabled={loading || !login.trim() || !password.trim()}
        >
          {loading ? (
            <>
              <span className="spinner-border-sm" />
              Вход...
            </>
          ) : (
            'Войти'
          )}
        </button>

      </form>
    </div>
  );
};

export default LoginForm;