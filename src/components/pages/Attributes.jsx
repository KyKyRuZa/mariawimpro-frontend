// Attributes.jsx
import React from 'react';
import './Style.css';
import img1 from '../../styles/assets/1.jpg'
import img2 from '../../styles/assets/2.jpg'
import img3 from '../../styles/assets/3.jpg'
import img4 from '../../styles/assets/4.jpg'
const Attributes = () => {
  const items = [
    { id: 1, name: 'Защитная шапочка', price: '1 500 ₽', img: img1},
    { id: 2, name: 'Ласты', price: '1 200 ₽', img: img2 },
    { id: 3, name: 'Спортивная сумка', price: '2 800 ₽', img: img3 },
    { id: 4, name: 'Защитные очки', price: '900 ₽', img: img4 },
  ];

  const tgLink = 'https://t.me/tvo_bot_ili_kanal';

  return (
    <div className="attributes-container">
      <h1 className="main-title">АТРИБУТИКА</h1>
      <main className="merch-grid">
        {items.map((item) => (
          <div key={item.id} className="merch-card">
            <img src={item.img} alt={item.name} className="merch-image" />
            <div className="merch-info">
              <h3 className="merch-name">{item.name}</h3>
              <p className="merch-price">{item.price}</p>
            </div>
          </div>
        ))}
      </main>

      {/* Кнопка с переходом в Telegram */}
      <div className="cta-section">
        <a href={tgLink} target="_blank" rel="noopener noreferrer" className="btn tg-btn">
          💬 Заказать в Telegram
        </a>
      </div>
    </div>
  );
};

export default Attributes;