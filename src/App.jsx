import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import MainPage from './page/public/MainPage';
import CoachInfoPage from './page/public/CoachInfoPage';
import AdminPanel from './page/private/AdminPanel';
import LoginForm from './components/auth/LoginForm';
import NotFound from './page/public/NotFound';
import './styles/global.css';

function ScrollManager() {
  const location = useLocation();
  const isPopState = useRef(false);

  useEffect(() => {
    // Обработчик для определения навигации назад/вперед
    const handlePopState = () => {
      isPopState.current = true;
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    // Генерируем уникальный ключ для хранения позиции скролла
    const getStorageKey = () => {
      if (location.pathname.startsWith('/coaches/')) {
        const coachId = location.pathname.split('/')[2];
        return `scroll-coach-${coachId}`;
      }
      return `scroll-${location.pathname}`;
    };

    const storageKey = getStorageKey();

    if (isPopState.current) {
      // Восстанавливаем позицию при навигации назад/вперед
      const savedPosition = sessionStorage.getItem(storageKey);
      if (savedPosition) {
        setTimeout(() => {
          window.scrollTo(0, parseInt(savedPosition));
        }, 0);
      }
      isPopState.current = false;
    } else {
      // Новая навигация - скроллим наверх
      window.scrollTo(0, 0);
    }

    // Сохраняем текущую позицию при уходе со страницы
    const saveScrollPosition = () => {
      sessionStorage.setItem(storageKey, window.scrollY.toString());
    };

    window.addEventListener('beforeunload', saveScrollPosition);

    return () => {
      window.removeEventListener('beforeunload', saveScrollPosition);
      saveScrollPosition(); // Сохраняем при размонтировании
    };
  }, [location]);

  return null;
}

function App() {
  return (
    <Router>
      <div className='app'>
        <ScrollManager />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/coaches/:coachId" element={<CoachInfoPage />} />
          <Route path="/admin/*" element={<AdminPanel/>} />
          <Route path="/login" element={<LoginForm/>} />
          <Route path="*" element={<NotFound />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;