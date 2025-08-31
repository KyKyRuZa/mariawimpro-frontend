import { useState, useEffect } from 'react';
import { Link as ScrollLink, Events, scrollSpy } from 'react-scroll';
import '../../styles/UI/header.css'
import logo from '../../styles/assets/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('forma-obucheniya');

  useEffect(() => {
    // Инициализация react-scroll
    Events.scrollEvent.register('begin', (to) => {
      setActiveSection(to);
    });

    Events.scrollEvent.register('end', (to) => {
      setActiveSection(to);
    });

    scrollSpy.update();

    return () => {
      Events.scrollEvent.remove('begin');
      Events.scrollEvent.remove('end');
    };
  }, []);

  useEffect(() => {
    // Блокировка скролла при открытом меню
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

  const handleNavClick = (id) => {
    setActiveSection(id);
    closeMenu();
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
        <div className="header-logo">
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
                <ScrollLink
                  to={item.id}
                  spy={true}
                  smooth={true}
                  duration={500}
                  offset={-90}
                  className={activeSection === item.id ? 'active' : ''}
                  onClick={() => handleNavClick(item.id)}
                  onSetActive={() => setActiveSection(item.id)}
                >
                  {item.label}
                </ScrollLink>
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