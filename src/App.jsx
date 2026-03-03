import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import MainPage from './page/public/MainPage';
import CoachInfoPage from './page/public/CoachInfoPage';
const AdminPanel = lazy(() => import('./page/private/AdminPanel'));
import LoginForm from './components/auth/LoginForm';
import NotFound from './page/public/NotFound';
import Agreement from './components/pages/Agreement';
import PolitikaKonfidencialnosti from './components/pages/Сonfederacy';
import CookieConsentBanner from './components/CookieConsentBanner';
import { CookieProvider } from './context/CookieContext';
import './styles/global.css';

const AppContent = () => {
  const location = useLocation();

  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} key={location.pathname} />
        <Route path="/coaches/:coachId" element={<CoachInfoPage />} />
        <Route 
          path="/admin/*" 
          element={
            <Suspense fallback={<div className="admin-panel-loading">Загрузка админки...</div>}>
              <AdminPanel />
            </Suspense>
          } 
        />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dogovor-oferty" element={<Agreement />} />
        <Route path="/politika-konfidencialnosti" element={<PolitikaKonfidencialnosti />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <CookieConsentBanner />
    </>
  );
};

function App() {
  return (
    <CookieProvider>
      <Router>
        <div className='app'>
          <AppContent />
        </div>
      </Router>
    </CookieProvider>
  );
}

export default App;