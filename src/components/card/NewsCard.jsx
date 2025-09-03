import React from 'react';

const renderDescription = (text) => {
  if (!text) return null;

  const lines = text
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);

  if (lines.length === 0) return null;

  return (
    <ul className="news-description-list">
      {lines.map((item, index) => (
        <li key={index} className="news-description-item">
          {item}
        </li>
      ))}
    </ul>
  );
};

const NewsCard = ({
  title,
  description,
  extra,
  promo = false,
}) => {
  return (
    <div className={`news-card ${promo ? 'news-card--promo' : 'news-card--common'}`}>
      <div className="news-card-content">
        {/* Заголовок карточки */}
        {title && <h3 className="news-card-title">{title}</h3>}

        {/* Описание — только список */}
        {description && (
          <div className="news-card-description">
            {renderDescription(description)}
          </div>
        )}

        {/* Дополнительная информация */}
        {extra && <span className="news-card-extra">{extra}</span>}
      </div>
    </div>
  );
};

export default NewsCard;