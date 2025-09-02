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
            title="Тренеры -"
            description="Профессиональные спортсмены, специалисты в области ФКИС, с педагогическим образованием, богатым опытом и стажем в работе с детьми"
          />
          <AdvantageCard 
            title="От новичка до чемпиона"
            description="полный путь обучения с гарантией результата"
          />
          <AdvantageCard 
            title="Участие на соревнованиях"
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