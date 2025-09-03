import { useNavigate } from 'react-router-dom';

const CoachesCard = ({
    image, 
    alt = "Фото тренера", 
    text,
    coachId // добавляем пропс для ID тренера
}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (coachId) {
            navigate(`/coaches/${coachId}`);
        }
    };

    return(
        <div className="coaches-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
            {image && (
                <div className="coaches-card-image">
                    <img src={image} alt={alt} />
                </div>
            )}
            {text && <div className="coaches-card-text">{text}</div>}
        </div>
    )
}

export default CoachesCard;