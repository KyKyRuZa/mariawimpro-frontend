import FormCard from '../card/FormCard';
import groupImage from '../../styles/assets/group.png'
import splitImage from '../../styles/assets/split.png'
import individualImage from '../../styles/assets/individual.png'

const TrainingPage = () => {
  return (
    <div className='training-container'>
        <h1 className='main-title'>ФОРМА ОБУЧНИЯ</h1>
        <FormCard
            title="Групповые занятия"
            description={
                <>
                <strong>Малые группы (до 6):</strong> Эффективный формат с персональным моментом.
                <br />
                <strong>Большие группы (до 15):</strong> Домашние тренировки в команде.
                </>
            }
            imageUrl={groupImage}
            altText="Групповые занятия"
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
         />
    </div>
    
  );
};

export default TrainingPage;