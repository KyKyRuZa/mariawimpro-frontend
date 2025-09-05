import React, { useState } from 'react';
import '../../styles/card/price.css';

const PriceCard = ({
  title = "ГРУППОВЫЕ",
  button1 = "БОЛЬШАЯ",
  button2 = "МАЛАЯ",
  priceList1 = [],
  priceList2 = [],
  isVisible = false,
  delay = 0
}) => {
  const [selectedButton, setSelectedButton] = useState(button1);

  const currentPriceList = selectedButton === button1 ? priceList1 : priceList2;

  return (
    <div 
      className={`price-card ${isVisible ? 'animate' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <h2 className={`price-card-title ${isVisible ? 'animate' : ''}`}>{title}</h2>

      <div className={`button-group ${isVisible ? 'animate' : ''}`}>
        <button
          className={`price-btn ${selectedButton === button1 ? 'active' : ''} ${isVisible ? 'animate' : ''}`}
          onClick={() => setSelectedButton(button1)}
        >
          {button1}
        </button>
        <button
          className={`price-btn ${selectedButton === button2 ? 'active' : ''} ${isVisible ? 'animate' : ''}`}
          onClick={() => setSelectedButton(button2)}
        >
          {button2}
        </button>
      </div>

      <div className={`price-list ${isVisible ? 'animate' : ''}`}>
        {currentPriceList.map((item, index) => (
          <div 
            key={index} 
            className={`price-item ${isVisible ? 'animate' : ''}`}
            style={{ transitionDelay: `${isVisible ? 600 + index * 200 : 0}ms` }}
          >
            <span className="price-label">{item.label}</span>
            <span className="price-value">{item.price} ₽</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceCard;