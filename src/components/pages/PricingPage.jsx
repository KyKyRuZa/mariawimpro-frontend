import React, { useState, useEffect } from 'react';
import PriceCard from "../card/PriceCard";
import { tariffsApi } from '../../api/tariffs';
import useInView from '../../hooks/useInView';
import '../../styles/card/price.css';

const PricePage = () => {
  const [groupPrices, setGroupPrices] = useState({ priceList1: [], priceList2: [] });
  const [individualPrices, setIndividualPrices] = useState({ priceList1: [], priceList2: [] });
  const [splitPrices, setSplitPrices] = useState({ priceList1: [], priceList2: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ref, isInView] = useInView({
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });

  const sortTariffsByDuration = (tariffs) => {
    const order = ['1 тренировка', '4 тренировки', '7 тренировок', '8 тренировок', '10 тренировок'];
    return [...tariffs].sort((a, b) => {
      return order.indexOf(a.label) - order.indexOf(b.label);
    });
  };

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const data = await tariffsApi.getAll();
        
        const groupBig = sortTariffsByDuration(
          data
            .filter(item => item.category === 'group' && item.type === 'big')
            .map(item => ({ label: item.duration, price: Number(item.price) }))
        );
        
        const groupSmall = sortTariffsByDuration(
          data
            .filter(item => item.category === 'group' && item.type === 'small')
            .map(item => ({ label: item.duration, price: Number(item.price) }))
        );
        
        const individual30 = sortTariffsByDuration(
          data
            .filter(item => item.category === 'individual' && item.type === '30min')
            .map(item => ({ label: item.duration, price: Number(item.price) }))
        );
        
        const individual45 = sortTariffsByDuration(
          data
            .filter(item => item.category === 'individual' && item.type === '45min')
            .map(item => ({ label: item.duration, price: Number(item.price) }))
        );
        
        const split30 = sortTariffsByDuration(
          data
            .filter(item => item.category === 'split' && item.type === '30min')
            .map(item => ({ label: item.duration, price: Number(item.price) }))
        );
        
        const split45 = sortTariffsByDuration(
          data
            .filter(item => item.category === 'split' && item.type === '45min')
            .map(item => ({ label: item.duration, price: Number(item.price) }))
        );

        setGroupPrices({
          priceList1: groupBig,
          priceList2: groupSmall
        });

        setIndividualPrices({
          priceList1: individual30,
          priceList2: individual45
        });

        setSplitPrices({
          priceList1: split30,
          priceList2: split45
        });

      } catch (err) {
        setError(err.message);
        console.error('Ошибка при загрузке тарифов:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  if (loading) return <div className="loading">Загрузка цен...</div>;
  if (error) return <div className="error">Ошибка загрузки цен: {error}</div>;

  return (
    <div className={`price-container ${isInView ? 'animate' : ''}`} ref={ref}>
      <div className={`main-title ${isInView ? 'animate' : ''}`}>ПРАЙС ЛИСТ</div>
      <div className={`card-container ${isInView ? 'animate' : ''}`}>
        <PriceCard
          title="ГРУППОВЫЕ"
          button1="БОЛЬШАЯ"
          button2="МАЛАЯ"
          priceList1={groupPrices.priceList1}
          priceList2={groupPrices.priceList2}
          isVisible={isInView}
          delay={0}
        />

        <PriceCard
          title="ИНДИВИДУАЛЬНЫЕ"
          button1="30 мин"
          button2="45 мин"
          priceList1={individualPrices.priceList1}
          priceList2={individualPrices.priceList2}
          isVisible={isInView}
          delay={200}
        />

        <PriceCard
          title="СПЛИТ"
          button1="30 мин"
          button2="45 мин"
          priceList1={splitPrices.priceList1}
          priceList2={splitPrices.priceList2}
          isVisible={isInView}
          delay={400}
        />
      </div>
    </div>
  );
};

export default PricePage;