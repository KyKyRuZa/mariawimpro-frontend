const AdvantageCard = ({ title, description, isVisible = false, delay = 0 }) => {
  return (
    <div 
      className={`advantage-card ${isVisible ? 'animate' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="advantage-card-content">
        <h3 className="advantage-card-title">{title}</h3>
        <p className="advantage-card-description">{description}</p>
      </div>
    </div>
  );
};

export default AdvantageCard;