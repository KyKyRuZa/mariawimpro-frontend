import React from 'react';
import { useCookie } from '../context/CookieContext';
import './CookieConsentBanner.css';

const CookieConsentBanner = () => {
  const { cookiesAccepted, cookiesLoaded, acceptCookies, rejectCookies } = useCookie();


  if (!cookiesLoaded) {
    return null;
  }
  
  if (cookiesAccepted) {
    return null;
  }


  return (
    <div className="cookie-consent-banner">
      <div className="cookie-consent-content">
        <h3>Мы используем cookies</h3>
        <p>
          Наш сайт использует cookies (включая Яндекс.Карты) 
          для улучшения работы сервиса, анализа трафика и персонализации контента. 
          Вы можете ознакомиться с нашей 
          <a href="/politika-konfidencialnosti"> Политикой конфиденциальности</a>.
        </p>
        <div className="cookie-consent-buttons">
          <button className="cookie-consent-accept" onClick={acceptCookies}>
            Принять все
          </button>
          <button className="cookie-consent-reject" onClick={rejectCookies}>
            Отклонить
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;