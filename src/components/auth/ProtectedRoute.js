import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../api/auth';
import LoginForm from './LoginForm';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated();
      setIsAuthenticated(authenticated);
      
      if (!authenticated) {
        navigate('/login', { 
          state: { from: { pathname: location.pathname } } 
        });
      }
    };

    checkAuth();
  }, [navigate]);

  if (isAuthenticated === null) {
    return <div>Загрузка...</div>; // или спиннер
  }

  return isAuthenticated ? children : <LoginForm />;
};

export default ProtectedRoute;