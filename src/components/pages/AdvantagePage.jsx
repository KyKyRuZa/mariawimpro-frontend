import React from 'react';
import AdvantageCard from '../card/AdvantageCard';
import '../../styles/advantage.css';
import useInView from '../../hooks/useInView';

const Advantage = () => {
  const [ref, isInView] = useInView({
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });

  return (
    <section className={`advantage-container ${isInView ? 'animate' : ''}`} ref={ref}>
      <h1 className={`main-title ${isInView ? 'animate' : ''}`}>
        ПОЧЕМУ СТОИТ ВЫБРАТЬ НАШУ ШКОЛУ ПЛАВАНИЯ?
      </h1>

      <div className="advantages-grid">
        <div className="row">
          <AdvantageCard 
            title="Тренеры -"
            description="Профессиональные спортсмены, специалисты в области ФКИС, с педагогическим образованием, богатым опытом и стажем в работе с детьми"
            isVisible={isInView}
            delay={0}
          />
          <AdvantageCard 
            title="От новичка до чемпиона"
            description="полный путь обучения с гарантией результата"
            isVisible={isInView}
            delay={100}
          />
          <AdvantageCard 
            title="Участие на соревнованиях"
            description="от городских стартов до профессионального уровня"
            isVisible={isInView}
            delay={200}
          />
        </div>
        <div className="row center">
           <AdvantageCard 
              title="Авторская методика"
              description="эффективные программы для любого возраста и подготовки"
              isVisible={isInView}
              delay={300}
            />
            <AdvantageCard 
              title="Индивидуальный подход"
              description="внимание к каждому ученику для максимального прогресса"
              isVisible={isInView}
              delay={400}
            />
        </div>
      </div>
    </section>
  );
};

export default Advantage;