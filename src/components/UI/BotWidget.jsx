import { useState, useEffect } from 'react';
import './BotWidget.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegram } from '@fortawesome/free-brands-svg-icons';

const BotWidget = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const openBot = () => {
    window.open('https://t.me/your_bot_username', '_blank');
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isHovered) {
        setIsVisible(false);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [isHovered]);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <div 
        className={`bot-widget ${isVisible ? 'visible' : 'hidden'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={openBot}
      >
        <div className="bot-icon">
          <FontAwesomeIcon icon={faTelegram} color="white" />
        </div>
        <div className="bot-content">
          <span className="bot-text">Есть вопросы?</span>
          <span className="bot-subtext">Напишите нашему боту</span>
        </div>
        <div className="bot-close" onClick={(e) => {
          e.stopPropagation();
          setIsVisible(false);
        }}>
          ×
        </div>
      </div>
      
      {!isVisible && (
        <div 
          className="bot-widget-toggle"
          onClick={toggleVisibility}
        >
        <FontAwesomeIcon icon={faTelegram} size="2x" color="white" />
        </div>
      )}
    </>
  );
};

export default BotWidget;