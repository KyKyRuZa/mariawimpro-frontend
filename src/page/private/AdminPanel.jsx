import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminCoaches from './AdminCoaches';
import AdminNews from './AdminNews';
import AdminPrices from './AdminPrices';
import AdminGallery from './AdminGallery';
import LoginForm from '../../components/auth/LoginForm';
import { authService } from '../../api/auth';
import '../../styles/admin/admin.css';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('trainers');
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated();
      setIsAuthenticated(authenticated);
      
      if (!authenticated) {
        navigate('/login', { 
          state: { from: { pathname: '/admin' } } 
        });
      }
    };

    checkAuth();
  }, [navigate]);

  // Закрытие меню при изменении размера окна
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="admin-panel-loading">
        <div>Проверка авторизации...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const renderContent = () => {
    switch(activeTab) {
      case 'trainers':
        return <AdminCoaches />;
      case 'news':
        return <AdminNews />;
      case 'prices':
        return <AdminPrices />;
      case 'gallery':
        return <AdminGallery />;
      default:
        return <div>Выберите раздел</div>;
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (window.innerWidth <= 768) {
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="admin-panel">
      <div className="sidebar">
        <div className="sidebar-header">
          <div className='flex'>
            <h2>Админ-панель</h2>
          <button 
            onClick={handleLogout}
            className="logout-btn"
            title="Выйти"
          >
            <i className="bi bi-box-arrow-right"></i>
            Выйти
          </button>
          </div>
          
          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Открыть меню"
          >
            ☰
          </button>
        </div>
        
        <ul className={`sidebar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li 
            className={activeTab === 'trainers' ? 'active' : ''}
            onClick={() => handleTabChange('trainers')}
          >
            <i className="bi bi-people-fill"></i>
            Тренера
          </li>
          <li 
            className={activeTab === 'news' ? 'active' : ''}
            onClick={() => handleTabChange('news')}
          >
            <i className="bi bi-newspaper"></i>
            Новости
          </li>
          <li 
            className={activeTab === 'prices' ? 'active' : ''}
            onClick={() => handleTabChange('prices')}
          >
            <i className="bi bi-tag-fill"></i>
            Цены
          </li>
          <li 
            className={activeTab === 'gallery' ? 'active' : ''}
            onClick={() => handleTabChange('gallery')}
          >
            <i className="bi bi-images"></i>
            Галерея
          </li>
        </ul>
      </div>
      
      <div className="main-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminPanel;