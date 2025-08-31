import React, { useState } from 'react';
import '../../styles/card/price.css';

const PriceCard = ({
  title = "ГРУППОВЫЕ",
  button1 = "БОЛЬШАЯ",
  button2 = "МАЛАЯ",
  priceList1 = [],
  priceList2 = [],
}) => {
  const [selectedButton, setSelectedButton] = useState(button1);

  const currentPriceList = selectedButton === button1 ? priceList1 : priceList2;

  return (
    <div className="price-card">
      <h2 className="price-card-title">{title}</h2>

      <div className="button-group">
        <button
          className={`price-btn ${selectedButton === button1 ? 'active' : ''}`}
          onClick={() => setSelectedButton(button1)}
        >
          {button1}
        </button>
        <button
          className={`price-btn ${selectedButton === button2 ? 'active' : ''}`}
          onClick={() => setSelectedButton(button2)}
        >
          {button2}
        </button>
      </div>

      <div className="price-list">
        {currentPriceList.map((item, index) => (
          <div key={index} className="price-item">
            <span className="price-label">{item.label}</span>
            <span className="price-value">{item.price} ₽</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceCard;