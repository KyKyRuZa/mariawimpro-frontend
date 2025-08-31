import React from 'react';
import AdvantageCard from '../card/AdvantageCard';
import '../../styles/advantage.css';

const Advantage = () => {
  return (
    <section className="advantage-container">
      <h1 className="main-title">ПОЧЕМУ СТОИТ ВЫБРАТЬ НАШУ ШКОЛУ ПЛАВАНИЯ?</h1>

      <div className="advantages-grid">
        <div className="row">
          <AdvantageCard 
            title="Тренеры-профессионалы"
            description="мастера спорта с педагогическим образованием и богатым опытом"
          />
          <AdvantageCard 
            title="От новичка до чемпиона"
            description="полный путь обучения с гарантией результата"
          />
          <AdvantageCard 
            title="Практика на соревнованиях"
            description="от городских стартов до профессионального уровня"
          />
        </div>
        <div className="row center">
           <AdvantageCard 
              title="Авторская методика"
              description="эффективные программы для любого возраста и подготовки"
            />
            <AdvantageCard 
              title="Индивидуальный подход"
              description="внимание к каждому ученику для максимального прогресса"
            />
        </div>
      </div>
    </section>
  );
};

export default Advantage;