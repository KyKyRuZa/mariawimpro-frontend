import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import MainPage from './page/public/MainPage';
import CoachInfoPage from './page/public/CoachInfoPage';
import AdminPanel from './page/private/AdminPanel';
import LoginForm from './components/auth/LoginForm';
import NotFound from './page/public/NotFound';
import './styles/global.css';

const AppContent = () => {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/" element={<MainPage />} key={location.pathname} />
      <Route path="/coaches/:coachId" element={<CoachInfoPage />} />
      <Route path="/admin/*" element={<AdminPanel />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <div className='app'>
        <AppContent />
      </div>
    </Router>
  );
}
export default App;