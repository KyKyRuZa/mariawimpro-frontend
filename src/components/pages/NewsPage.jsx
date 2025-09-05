import { useEffect, useRef } from 'react';
import NewsCard from "../card/NewsCard";
import { useNews } from '../../hooks/useNews';
import '../../styles/news.css'

const NewsPage = () => {
    const { news, loading, error, fetchNews } = useNews();
    const hasFetchedRef = useRef(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        if (news.length === 0 && !loading && !hasFetchedRef.current) {
            hasFetchedRef.current = true;
            fetchNews();
        }
    }, [news.length, loading, fetchNews]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.3, rootMargin: '0px 0px -50px 0px' }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    if (loading) {
        return <div className="loading">Загрузка новостей...</div>;
    }

    if (error) {
        return <div className="error">Ошибка загрузки новостей: {error.message}</div>;
    }

    return(
        <div className="news-container" ref={sectionRef}>
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