import React, { useEffect, useRef, useState } from 'react';
import '../../styles/map.css';

const MapPage = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [placemarks, setPlacemarks] = useState({});
  const [activePool, setActivePool] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const locations = {
    'ibragimova': [55.822225, 49.092921], // A-fitness
    'bondarenko': [55.833895, 49.107097], // Ватан
    '1maya': [55.812216, 49.064391],      // Адмиралтейский
    'hakima': [55.816713, 49.149713]      // Дворец водных видов спорта
  };

  // Загрузка API Яндекс.Карт
  useEffect(() => {
    // Проверяем, не загружено ли API уже
    if (window.ymaps) {
      initMap(window.ymaps);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/2.1/?apikey=1172a209-3ee1-42c2-8290-1f9583781111&lang=ru_RU';
    script.async = true;
    
    script.onload = () => {
      window.ymaps.ready(() => {
        initMap(window.ymaps);
      });
    };

    script.onerror = () => {
      console.error('Failed to load Yandex Maps API');
    };

    document.head.appendChild(script);

    return () => {
      // Очистка при размонтировании компонента
      if (mapInstance.current) {
        mapInstance.current.destroy();
      }
      document.head.removeChild(script);
    };
  }, []);

  // Инициализация карты
  const initMap = (ymaps) => {
    const newMap = new ymaps.Map(mapRef.current, {
      center: [55.815048, 49.106360],
      zoom: 13,
      controls: ['zoomControl'],
    });

    const newPlacemarks = {};

    // Создаем метки для каждого бассейна
    Object.entries(locations).forEach(([id, coords]) => {
      const placemark = new ymaps.Placemark(coords, {
        hintContent: getLocationName(id),
        balloonContent: `
          <b>${getLocationName(id)}</b><br>
          ${getLocationAddress(id)}
        `
      }, {
        preset: 'islands#blueSwimmingIcon'
      });

      newPlacemarks[id] = placemark;
      newMap.geoObjects.add(placemark);
    });

    mapInstance.current = newMap;
    setPlacemarks(newPlacemarks);
    setMapLoaded(true);
  };

  // Функция для перемещения карты к выбранному бассейну
  const showOnMap = (locationId) => {
    setActivePool(locationId);
    
    if (mapInstance.current && locations[locationId]) {
      const coords = locations[locationId];
      const placemark = placemarks[locationId];

      mapInstance.current.setCenter(coords, 15, {
        duration: 800,
        flying: true
      }).then(() => {
        if (placemark) {
          placemark.balloon.open();
        }
      });
    }
  };

  // Вспомогательные функции
  const getLocationName = (id) => {
    const names = {
      'ibragimova': 'A-fitness',
      'bondarenko': 'Бассейн "Ватан"',
      '1maya': 'Бассейн "Адмиралтейский"',
      'hakima': 'Дворец водных видов спорта'
    };
    return names[id] || 'Бассейн';
  };

  const getLocationAddress = (id) => {
    const addresses = {
      'ibragimova': 'ул. Ибрагимова, 54',
      'bondarenko': 'ул. Бондаренко, 2',
      '1maya': 'ул. 1 Мая, д. 5',
      'hakima': 'ул. Сибгата Хакима, 70'
    };
    return addresses[id] || 'Адрес не указан';
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
        {!mapLoaded && (
          <div className="mapLoading">
            <div className="loadingSpinner"></div>
            <p>Загрузка карты...</p>
          </div>
        )}
        <div 
          ref={mapRef} 
          className="mapIframe"
          style={{ 
            width: '100%', 
            height: '100%',
            opacity: mapLoaded ? 1 : 0
          }}
        />
      </div>
    </div>
  );
};

export default MapPage;