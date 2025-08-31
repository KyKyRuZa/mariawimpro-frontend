import { useEffect, useRef } from 'react';
import NewsCard from "../card/NewsCard";
import { useNews } from '../../hooks/useNews';
import '../../styles/news.css'

const NewsPage = () => {
    const { news, loading, error, fetchNews } = useNews();
    const hasFetchedRef = useRef(false);

    useEffect(() => {
        // Загружаем новости только если они еще не загружены и запрос еще не выполнялся
        if (news.length === 0 && !loading && !hasFetchedRef.current) {
            hasFetchedRef.current = true;
            fetchNews();
        }
    }, [news.length, loading, fetchNews]);

    if (loading) {
        return <div className="loading">Загрузка новостей...</div>;
    }

    if (error) {
        return <div className="error">Ошибка загрузки новостей: {error.message}</div>;
    }

    return(
        <div className="news-container">
            <div className="main-title">НОВОСТИ И ПРЕДЛОЖЕНИЯ</div>
            <div className="news-content">
                {news.map((newsItem) => (
                    <NewsCard
                        key={newsItem.id}
                        title={newsItem.title}
                        description={newsItem.description}
                        extra={newsItem.extra}
                        promo={newsItem.promo}
                    />
                ))}
            </div>
        </div>
    )
}

export default NewsPage;