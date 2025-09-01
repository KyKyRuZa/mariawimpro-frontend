import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './page/public/MainPage';
import CoachInfoPage from './page/public/CoachInfoPage';
import AdminPanel from './page/private/AdminPanel';
import LoginForm from './components/auth/LoginForm';
import './styles/global.css';


function App() {
  return (
      <Router>
        <div className='app'>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/coaches/:coachId" element={<CoachInfoPage />} />
            <Route path="/admin/*" element={<AdminPanel/>} />
            <Route path="/login" element={<LoginForm/>} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;