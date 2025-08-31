import React from 'react';
import { Link } from 'react-scroll';
import '../../styles/UI/footer.css';
import logo from '../../styles/assets/logo.png';
import Whatsapp from '../../styles/assets/whatsapp.png';
import VK from '../../styles/assets/vk.png';
import Telegramm from '../../styles/assets/tg.png';

const Footer = () => {
    const navItems = [
    { id: 'forma-obucheniya', label: 'Форма обучения' },
    { id: 'o-nas', label: 'О нас' },
    { id: 'trenery', label: 'Тренеры' },
    { id: 'prays', label: 'Прайс' },
    { id: 'novosti', label: 'Новости' },
    { id: 'kontakty', label: 'Контакты' }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <div className="footer-logo">
            <img src={logo} alt="MARIASWIMPRO" />
            <div className="logo-text">
              MARIASWIMPRO <br /> <span>prime of life</span>
            </div>
          </div>
          <div className="footer-social">
            <a href="#"><img src={Whatsapp} alt="WhatsApp" /></a>
            <a href="#"><img src={VK} alt="VK" /></a>
            <a href="#"><img src={Telegramm} alt="Telegramm" /></a>
          </div>
        </div>

        <nav className="footer-nav">
          <ul>
            {navItems.map(item => (
              <li key={item.id}>
                <Link
                  to={item.id}
                  smooth={true}
                  duration={500}
                  offset={-80}
                  className="footer-nav-link"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="footer-copyright">
        <p>© 2025 MARIASWIMPRO. Все права защищены</p>
      </div>
    </footer>
  );
};

export default Footer;