import '../../styles/welcome.css';
import { Link } from 'react-scroll';
import useInView from '../../hooks/useInView'

const WelcomeScreen = () => {
    const [ref, isVisible] = useInView({
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    const openBot = () => {
        window.open('https://t.me/mariaswimpro_bot', '_blank');
    };
    return (
        <div ref={ref} className="welcome-container">
            <div className={`slogan ${isVisible ? 'animate' : ''}`}>
                <div className="title">
                    <span>ПЛЫВИ К УСПЕХУ —</span>
                    <span>МЫ ПОМОЖЕМ!</span> 
                </div>
                <div className="subtitle"> Школа плавания для новичков и продвинутых пловцов </div>
            </div>
            
            <Link 
                to="prays" 
                spy={true} 
                smooth={true} 
                offset={-90}
                duration={500}
            >
                <button className={`welcome-btn ${isVisible ? 'animate' : ''}`} onClick={openBot}>
                    ЗАПИСАТЬСЯ
                </button>
            </Link>
        </div>
    )
}

export default WelcomeScreen;