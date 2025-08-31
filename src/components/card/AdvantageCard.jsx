import React from 'react';
import '../../styles/card/advantage.css';

const AdvantageCard = ({ 
  title, 
  description 
}) => {
  return (
    <div className="advantage-card">
      <div className="advantage-card-content">
        {title && <h3 className="advantage-card-title">{title}</h3>}
        {description && <p className="advantage-card-description">{description}</p>}
      </div>
    </div>
  );
};

export default AdvantageCard;