import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { scroller } from 'react-scroll';
import '../../styles/UI/header.css';
import logo from '../../styles/assets/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('forma-obucheniya');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') return;

    let observer = null;

    const initObserver = () => {
      const sections = document.querySelectorAll('section[id]');

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        { rootMargin: '-30% 0px -70% 0px' }
      );

      sections.forEach((section) => {
        if (section.id) observer.observe(section);
      });
    };

    initObserver();

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [location.pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    closeMenu();

    if (location.pathname === '/') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      setActiveSection('forma-obucheniya');
    } else {
      navigate('/', { state: { scrollToTop: true } });
    }
  };

  const handleNavClick = (id, e) => {
    e.preventDefault(); 
    closeMenu();

    if (location.pathname === '/') {
      scroller.scrollTo(id, {
        duration: 600,
        smooth: 'easeInOutCubic',
        offset: -90,
      });
      setActiveSection(id);
    } else {
      navigate('/', { state: { scrollTo: id } });
    }
  };

  const navItems = [
    { id: 'forma-obucheniya', label: 'Форма обучения' },
    { id: 'o-nas', label: 'О нас' },
    { id: 'trenery', label: 'Тренеры' },
    { id: 'prays', label: 'Прайс' },
    { id: 'novosti', label: 'Новости' },
    { id: 'kontakty', label: 'Контакты' },
  ];

  return (
    <header className="header">
      <div className="header-container">
        <div
          className="header-logo"
          onClick={handleLogoClick}
          role="button"
          tabIndex={0}
          aria-label="На главную"
        >
          <img src={logo} alt="MARIASWIMPRO" className="logo" />
          <div>
            MARIASWIMPRO <br /> prime of life
          </div>
        </div>

        <button
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`header-nav ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(item.id, e)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href="tel:+79178555388" className="header-phone">
          +7 (917) 855-53-88
        </a>
      </div>
    </header>
  );
};

export default Header;