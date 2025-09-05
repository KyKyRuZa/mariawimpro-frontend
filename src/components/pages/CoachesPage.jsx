import CoachesCard from "../card/CoachesCard";
import '../../styles/coache.css'
import { useCoaches } from '../../hooks/useCoaches';
import useInView from '../../hooks/useInView';

const CoachesPage = () => {
    const { coaches, loading, error } = useCoaches();
    const [ref, isInView] = useInView({
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    const sortedCoaches = [...coaches].sort((a, b) => a.id - b.id);

    if (loading) {
        return <div className="loading">Загрузка тренеров...</div>;
    }

    if (error) {
        return <div className="error">Ошибка загрузки тренеров: {error.message}</div>;
    }

    return (
        <div className={`coaches-container ${isInView ? 'animate' : ''}`} ref={ref}>
            <div className={`main-title ${isInView ? 'animate' : ''}`}>НАШИ ТРЕНЕРА</div>
            <div className="coaches-grid">
                {sortedCoaches.map((coach, index) => (
                    <CoachesCard
                        key={coach.id}
                        coachId={coach.id}
                        text={coach.fullName}
                        image={`https://mariaswimpro.ru/assets/${coach.photo}`}
                        alt={coach.fullName}
                        isVisible={isInView}
                        delay={index * 100}
                    />
                ))}
            </div>
        </div>
    )
}

export default CoachesPage;