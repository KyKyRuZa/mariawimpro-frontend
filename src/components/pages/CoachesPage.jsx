import CoachesCard from "../card/CoachesCard";
import '../../styles/coache.css'
import { useCoaches } from '../../hooks/useCoaches';

const CoachesPage = () => {
    const { coaches, loading, error } = useCoaches();
    
    const sortedCoaches = [...coaches].sort((a, b) => a.id - b.id);

    if (loading) {
        return <div className="loading">Загрузка тренеров...</div>;
    }

    if (error) {
        return <div className="error">Ошибка загрузки тренеров: {error.message}</div>;
    }

    return (
        <div className="coaches-container">
            <div className="main-title">НАШИ ТРЕНЕРА</div>
            <div className="coaches-grid">
                {sortedCoaches.map(coach => (
                    <CoachesCard
                        key={coach.id}
                        coachId={coach.id}
                        text={coach.fullName}
                        image={`https://mariaswimpro.ru/assets/${coach.photo}`}
                        alt={coach.fullName}
                    />
                ))}
            </div>
        </div>
    )
}

export default CoachesPage;