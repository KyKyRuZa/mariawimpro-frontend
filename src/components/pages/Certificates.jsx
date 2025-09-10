import '../../styles/gift.css';
import gift from '../../styles/assets/gift.jpg';
import useInView from '../../hooks/useInView';

const Certificates = () => {
  const [ref, isInView] = useInView({
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });
  
  const openBot = () => {
    window.open('https://t.me/mariaswimpro_bot', '_blank');
  };

  return (
    <div className="certificates-container" ref={ref}>
      <h1 className={`main-title ${isInView ? 'animate' : ''}`}>
        ПОДАРОЧНЫЙ СЕРТИФИКАТ
      </h1>

      <main className="certificates-grid">
        <div className={`certificate-wrapper ${isInView ? 'animate' : ''}`}>
          <div className="certificate-image-container">
            <img
              src={gift}
              alt="Подарочный сертификат на 4 тренировки по плаванию"
              className={`certificate-photo ${isInView ? 'animate' : ''}`}
            />
          </div>
          
          <div className="certificate-info">
            <h3 className={`info-title ${isInView ? 'animate' : ''}`}>
              СЕРТИФИКАТ НА ПЕРСОНАЛЬНЫЕ ТРЕНИРОВКИ
            </h3>
            <p className={`info-description ${isInView ? 'animate' : ''}`}>
              Идеальный подарок для тех, кто хочет научиться плавать или улучшить свою технику. 
              Профессиональные тренировки с индивидуальным подходом.
            </p>
            <button className={`certificate-button ${isInView ? 'animate' : ''}`} onClick={openBot}>
              ЗАКАЗАТЬ СЕРТИФИКАТ
            </button>
            <ul className={`certificate-condition ${isInView ? 'animate' : ''}`}>
              <li>Скидка 10%</li>
              <li>Подарок на день рождения</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Certificates;