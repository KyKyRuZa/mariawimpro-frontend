import { useState, useEffect } from 'react';
import CoachesCard from "../card/CoachesCard";
import '../../styles/coache.css'
import { coachesApi } from '../../api/coaches';
import { useCoaches } from '../../hooks/useCoaches';

const CoachesPage = () => {
    const [coaches, setCoaches] = useState([]);
    const {  loading, error } = useCoaches();

    useEffect(() => {
        const fetchCoaches = async () => {
            try {
                const response = await coachesApi.getAll();
                setCoaches(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке тренеров:', error);
            }
        };

        fetchCoaches();
    }, []);

    if (loading) {
        return <div className="loading">Загрузка новостей...</div>;
    }

    if (error) {
        return <div className="error">Ошибка загрузки тренеров: {error.message}</div>;
    }
    return (
        <div className="coaches-container">
            <div className="main-title">НАШИ ТРЕНЕРА</div>
            <div className="coaches-grid">
                {coaches.map(coach => (
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