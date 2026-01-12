import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Header from "../../components/UI/Header";
import Footer from "../../components/UI/Footer";
import '../../styles/coach-info.css';
import { coachesApi } from '../../api/coaches';
import { galleryApi } from '../../api/gallery';

const CoachInfoPage = () => {
    const { coachId } = useParams();
    const navigate = useNavigate();
    const [coach, setCoach] = useState(null);
    const [gallery, setGallery] = useState([]);
    const [loading, setLoading] = useState(true);
    const [galleryLoading, setGalleryLoading] = useState(true);
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const coachResponse = await coachesApi.getById(coachId);
                setCoach(coachResponse.data);

                const galleryResponse = await galleryApi.getByCoachId(coachId);
                setGallery(galleryResponse.data);
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
            } finally {
                setLoading(false);
                setGalleryLoading(false);
            }
        };

        fetchData();
    }, [coachId]);

    const openPhoto = (photo) => {
        setSelectedPhoto(photo);
        document.body.style.overflow = 'hidden';
    };

    const closePhoto = () => {
        setSelectedPhoto(null);
        document.body.style.overflow = 'unset';
    };

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closePhoto();
            }
        };

        if (selectedPhoto) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [selectedPhoto]);

    if (loading) return <div className="loading">Загрузка...</div>;
    if (!coach) return <div className="error">Тренер не найден</div>;

    return (
        <>
            <Header />
            <div className="coach-info-container">
                <div className="coach-header">
                    <button 
                        onClick={() => navigate(-1)}
                        className="back-button"
                        aria-label="Назад"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <img 
                        src={`https://mariaswimpro.ru/uploads/${coach.photo}`}
                        alt={coach.fullName} 
                        className="coach-avatar" 
                    />
                    <div className="coach-text">
                        <h1>{coach.fullName}</h1>
                        <div className="coach-info-list">
                            <p><strong>Образование:</strong> {coach.education}</p>
                            <p><strong>Специализация:</strong> {coach.specialization}</p>
                            <p><strong>Достижения:</strong> {coach.merits}</p>
                            <p><strong>Стаж работы:</strong> {coach.experience} лет</p>
                            <p><strong>Номер телефона:</strong> {coach.phone}</p>
                            <p><strong>Описание:</strong> {coach.description}</p>
                        </div>
                    </div>
                </div>

                <div className="coach-gallery-section">
                    <h2>Галерея</h2>
                    
                    {galleryLoading ? (
                        <div className="loading">Загрузка галереи...</div>
                    ) : gallery.length === 0 ? (
                        <div className="empty-gallery">
                            <p>В галерее пока нет фотографий</p>
                        </div>
                    ) : (
                        <div className="gallery-grid">
                            {gallery.map((photo) => (
                                <div 
                                    key={photo.id} 
                                    className="gallery-item"
                                    onClick={() => openPhoto(photo)}
                                >
                                    <img
                                        src={photo.fullPhotoUrl || `https://mariaswimpro.ru/uploads/${photo.photoUrl}`}
                                        alt={photo.caption || `Фото ${coach.fullName}`}
                                        className="gallery-image"
                                        data-ratio="auto"
                                    />
                                    {photo.caption && (
                                        <div className="gallery-caption">
                                            {photo.caption}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {selectedPhoto && (
                <div className="overlay-overlay" onClick={closePhoto}>
                    <div className="overlay-content" onClick={e => e.stopPropagation()}>
                        <button 
                            className="overlay-close"
                            onClick={closePhoto}
                            aria-label="Закрыть"
                        >
                            ×
                        </button>
                        <img
                            src={selectedPhoto.fullPhotoUrl || `https://mariaswimpro.ru/uploads/${selectedPhoto.photoUrl}`}
                            alt={selectedPhoto.caption || `Фото ${coach.fullName}`}
                            className="overlay-image"
                        />
                        {selectedPhoto.caption && (
                            <div className="overlay-caption">
                                {selectedPhoto.caption}
                            </div>
                        )}
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
};

export default CoachInfoPage;