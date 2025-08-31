// PricePage.js
import React, { useState, useEffect } from 'react';
import PriceCard from "../card/PriceCard";
import { tariffsApi } from '../../api/tariffs';

const PricePage = () => {
  const [groupPrices, setGroupPrices] = useState({ priceList1: [], priceList2: [] });
  const [individualPrices, setIndividualPrices] = useState({ priceList1: [], priceList2: [] });
  const [splitPrices, setSplitPrices] = useState({ priceList1: [], priceList2: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Функция для сортировки тарифов по длительности
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
        
        // Фильтруем данные по категориям и типам
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
    <div className='price-container'>
      <div className='main-title'>ПРАЙС ЛИСТ</div>
      <div className='card-container'>
        <PriceCard
          title="ГРУППОВЫЕ"
          button1="БОЛЬШАЯ"
          button2="МАЛАЯ"
          priceList1={groupPrices.priceList1}
          priceList2={groupPrices.priceList2}
        />

        <PriceCard
          title="ИНДИВИДУАЛЬНЫЕ"
          button1="30 мин"
          button2="45 мин"
          priceList1={individualPrices.priceList1}
          priceList2={individualPrices.priceList2}
        />

        <PriceCard
          title="СПЛИТ"
          button1="30 мин"
          button2="45 мин"
          priceList1={splitPrices.priceList1}
          priceList2={splitPrices.priceList2}
        />
      </div>
    </div>
  );
};

export default PricePage;