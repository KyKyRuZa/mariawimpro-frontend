import React from 'react';
import '../../styles/UI/footer.css';
import logo from '../../styles/assets/logo.ico';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVk, faTelegram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
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
            <a href="https://vk.com/mariaswimpro" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faVk} size="2x" color="white" />
            </a>
            <a href="https://t.me/swimwithmariaswimpro" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTelegram} size="2x" color="white" />
            </a>
          </div>
        </div>

        <h3 className='tablet'>Контакты</h3>
        <div className="footer-contact">
          <h3>Контакты</h3>
          <div className="contact-info">
            <a href="tel:+79178555388">+7 917 855-53-88</a>
            <a href="tel:+79173968310">+7 917 396-83-10</a>
            <a href="tel:+79178995088">+7 917 899-50-88</a>
          </div>
          <div className="contact-address">
            <p>г. Казань</p>
            <p>ул. Ибрагимова 54</p>
            <p>ул. 1 мая д 5</p>
          </div>
          <div className="contact-hours">
            <p>С 7.00-22.00</p>
            <p>Выходной - воскресенье</p>
          </div>
        </div>
      </div>

      <div className="footer-copyright">
        <p>© 2025 MARIASWIMPRO. Все права защищены</p>
        <p>Настоящий сайт использует файлы cookie и аналогичные технологии для обеспечения работы сайта, анализа посещаемости и взаимодействия со сторонними сервисами</p>
        <ul className="footer-legal-links">
          <li>
            <a href="/politika-konfidencialnosti" className="footer-nav-link">
              Политика конфиденциальности
            </a>
          </li>
          <li>
            <a href="/dogovor-oferty" className="footer-nav-link">
              Договор оферты
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;