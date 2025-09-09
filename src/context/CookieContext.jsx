// context/CookieContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const CookieContext = createContext();

export const useCookie = () => {
  const context = useContext(CookieContext);
  if (!context) {
    throw new Error('useCookie must be used within a CookieProvider');
  }
  return context;
};

export const CookieProvider = ({ children }) => {
  const [cookiesAccepted, setCookiesAccepted] = useState(false); // Начинаем с false
  const [cookiesLoaded, setCookiesLoaded] = useState(false);

  useEffect(() => {
    // Проверяем, было ли уже принято решение о cookies
    const consent = localStorage.getItem('cookieConsent');    
    if (consent === 'accepted') {
      setCookiesAccepted(true);
    } else {
      setCookiesAccepted(false); // Явно устанавливаем false
    }
    setCookiesLoaded(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setCookiesAccepted(true);
  };

  const rejectCookies = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setCookiesAccepted(false);
  };

  const value = {
    cookiesAccepted,
    cookiesLoaded,
    acceptCookies,
    rejectCookies
  };

  return (
    <CookieContext.Provider value={value}>
      {children}
    </CookieContext.Provider>
  );
};