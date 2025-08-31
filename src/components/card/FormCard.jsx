import React from 'react';
import '../../styles/card/formcard.css'

const FormCard = ({ 
  title, 
  description, 
  imageUrl, 
  altText = "Card image",
  reverse = false,
}) => {
  return (
     <div className={`form-card ${reverse ? 'form-card-reverse' : ''}`}>
      {imageUrl && (
        <div className="form-card-image">
          <img src={imageUrl} alt={altText} />
        </div>
      )}
      
      <div className="form-card-content">
        {title && <h2 className="form-card-title">{title}</h2>}
        {description && <p className="form-card-description">{description}</p>}
      </div>
    </div>
  );
};

export default FormCard;