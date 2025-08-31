import '../../styles/welcome.css';
import { Link } from 'react-scroll';

const WelcomeScreen = () => {
    return (
        <div className="welcome-container">
            <div className='slogan'>
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
                <button className='welcome-btn'>ЗАПИСАТЬСЯ</button>
            </Link>
        </div>
    )
}

export default WelcomeScreen;