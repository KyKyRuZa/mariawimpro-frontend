import React, { useRef, useState } from 'react';
import '../../styles/map.css';

const MapPage = () => {
  const iframeRef = useRef(null);
  const [activePool, setActivePool] = useState(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);

    const showOnMap = (locationId) => {
    setActivePool(locationId);
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.showOnMap(locationId);
    }
  };

  const handleIframeLoad = () => {
    setIframeLoaded(true);
  };

  const pools = [
    { id: 'ibragimova', name: 'A-fitness', address: 'ул. Ибрагимова, 54' },
    { id: 'bondarenko', name: 'Бассейн "Ватан"', address: 'ул. Бондаренко, 2' },
    { id: '1maya', name: 'Бассейн "Адмиралтейский"', address: 'ул. 1 Мая, д. 5' },
    { id: 'hakima', name: 'Дворец водных видов спорта', address: 'ул. Сибгата Хакима, 70' }
  ];

  return (
    <div className="mapContainer">
      <div className="poolsList">
        <div className="cardHeader">
          <h2>НАШИ БАССЕЙНЫ</h2>
          <p className="headerSubtitle">Выберите бассейн для просмотра на карте</p>
        </div>
        
        <div className="poolsContainer">
          {pools.map(pool => (
            <div 
              key={pool.id}
              className={`poolItem ${activePool === pool.id ? 'poolItemActive' : ''}`}
              onClick={() => showOnMap(pool.id)}
              onKeyPress={(e) => e.key === 'Enter' && showOnMap(pool.id)}
              tabIndex={0}
              role="button"
              aria-label={`Показать на карте ${pool.name} по адресу ${pool.address}`}
            >
              <h3 className="poolTitle">
                {pool.name}
              </h3>
              <p className="poolAddress">{pool.address}</p>
            </div>
          ))}
        </div>
        
        <div className="contactSection">
          <p className="contactText">Записаться или получить консультацию:</p>
          <a href="tel:+79178555388" className="phoneButton">
            +7 (917) 855-53-88
          </a>
        </div>
      </div>
      
      <div className="mapFrame">
        {!iframeLoaded && (
          <div className="mapLoading">
            <div className="loadingSpinner"></div>
            <p>Загрузка карты...</p>
          </div>
        )}
        <iframe
          ref={iframeRef}
          className="mapIframe"
          src="/map.html"
          title="Карта бассейнов"
          onLoad={handleIframeLoad}
          style={{ opacity: iframeLoaded ? 1 : 0 }}
        />
      </div>
    </div>
  );
};

export default MapPage;