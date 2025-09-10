import FormCard from '../card/FormCard';
import groupImage from '../../styles/assets/group.jpg';
import splitImage from '../../styles/assets/split.jpg';
import individualImage from '../../styles/assets/individual.jpg';
import useInView from '../../hooks/useInView';
import '../../styles/formcard.css'

const TrainingPage = () => {
  const [ref, isInView] = useInView({
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });

  return (
    <div className='training-container' ref={ref}>
      <h1 className={`main-title ${isInView ? 'animate' : ''}`}>ФОРМА ОБУЧЕНИЯ</h1>
      <FormCard
        title="Групповые занятия"
        description={
          <>
            <strong>Малые группы (3-4):</strong> Эффективный формат с профессиональным подходом.
            <br />
            <strong>Большие группы (до 15):</strong> Групповой формат обучения детей в совершенствование техники плавания различными стилями.
          </>
        }
        imageUrl={groupImage}
        altText="Групповые занятия"
        isVisible={isInView}
        delay={0}
      />
      <FormCard 
        title="Сплит занятия"
        description={
          <>
            Идеально для двоих: друзья, пара или родственники. Тренер работает с обоими, учитывая цели каждого. Экономично и эффективно.
          </>
        }
        imageUrl={splitImage}
        altText="Сплит занятия"
        reverse={true}
        isVisible={isInView}
        delay={200}
      />
      <FormCard
        title="Индивидуальные занятия"
        description={
          <>
            Персональный подход — только вы и тренер. Программа под ваши цели, темп и график. Максимум внимания и быстрый прогресс.
          </>
        }
        imageUrl={individualImage}
        altText="Индивидуальные занятия"
        isVisible={isInView}
        delay={400}
      />
    </div>
  );
};

export default TrainingPage;