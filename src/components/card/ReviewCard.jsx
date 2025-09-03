import React from 'react';

const ReviewsCard = ({ 
  name, 
  date, 
  rating, 
  text 
}) => {
  const getInitials = (name) => {
    if (!name) return "?"; 
    
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="reviews-card">
      <div className="reviews-card-header">
        <div className="reviews-avatar">
          <span>{getInitials(name)}</span>
        </div>
        <div className="reviews-info">
          <h3 className="reviews-name">{name}</h3>
          <p className="reviews-date">{date}</p>
        </div>
        <div className="reviews-rating">
          {'★'.repeat(rating)}
          {'☆'.repeat(5 - rating)}
        </div>
      </div>
      <p className="reviews-text">{text}</p>
    </div>
  );
};

export default ReviewsCard;