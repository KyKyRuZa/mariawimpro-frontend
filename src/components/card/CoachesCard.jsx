import { useNavigate } from 'react-router-dom';

const CoachesCard = ({ coachId, text, image, alt, isVisible = false, delay = 0 }) => {
const navigate = useNavigate();

    const handleClick = () => {
        if (coachId) {
            navigate(`/coaches/${coachId}`);
        }
    };

    return (
        <div 
            className={`coaches-card ${isVisible ? 'animate' : ''}`}
             onClick={handleClick}
            style={{ transitionDelay: `${delay}ms` }}
        >
            <div className="coaches-card-image">
                <img src={image} alt={alt} />
            </div>
            <div className="coaches-card-text">{text}</div>
        </div>
    );
};

export default CoachesCard;