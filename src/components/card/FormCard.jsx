const FormCard = ({ title, description, imageUrl, altText, reverse = false, isVisible = false, delay = 0 }) => {
  return (
    <div 
      className={`form-card ${reverse ? 'form-card-reverse' : ''} ${isVisible ? 'animate' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="form-card-image">
        <img src={imageUrl} alt={altText} />
      </div>
      <div className="form-card-content">
        <h3 className="form-card-title">{title}</h3>
        <p className="form-card-description">{description}</p>
      </div>
    </div>
  );
};

export default FormCard;