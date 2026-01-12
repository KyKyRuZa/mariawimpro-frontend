import React, { useState, useEffect } from 'react';
import { useTariffs } from '../../hooks/useTariffs';
import '../../styles/admin/AdminCommon.css';

const AdminPrices = () => {
  const { tariffs, loading, error, fetchTariffs, createTariff, updateTariff } = useTariffs();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTariff, setEditingTariff] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'group',
    type: 'big',
    duration: ''
  });

  // Опции
  const categoryOptions = [
    { value: 'group', label: 'Групповые' },
    { value: 'individual', label: 'Индивидуальные' },
    { value: 'split', label: 'Сплит' }
  ];

  const typeOptions = {
    group: [
      { value: 'big', label: 'БОЛЬШАЯ' },
      { value: 'small', label: 'МАЛАЯ' }
    ],
    individual: [
      { value: '30min', label: '30 мин' },
      { value: '45min', label: '45 мин' }
    ],
    split: [
      { value: '30min', label: '30 мин' },
      { value: '45min', label: '45 мин' }
    ]
  };

  const durationOptions = [
    '1 тренировка', '4 тренировки', '7 тренировок', '8 тренировок', '10 тренировок'
  ];

  useEffect(() => {
    fetchTariffs();
  }, []);

  const tariffsData = Array.isArray(tariffs) ? tariffs : [];

  useEffect(() => {
    if (editingTariff) {
      setFormData({
        name: editingTariff.name || '',
        price: editingTariff.price ? editingTariff.price.toString() : '',
        category: editingTariff.category || 'group',
        type: editingTariff.type || 'big',
        duration: editingTariff.duration || ''
      });
    } else {
      setFormData({
        name: '',
        price: '',
        category: 'group',
        type: 'big',
        duration: ''
      });
    }
  }, [editingTariff]);

  const handleOpenModal = (tariffItem = null) => {
    setEditingTariff(tariffItem);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingTariff(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'category') {
      setFormData(prev => ({
        ...prev,
        category: value,
        type: typeOptions[value]?.[0]?.value || 'big'
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tariffData = {
        name: formData.name,
        price: parseFloat(formData.price),
        category: formData.category,
        type: formData.type,
        duration: formData.duration
      };

      if (editingTariff) {
        await updateTariff(editingTariff.id, tariffData);
      } else {
        await createTariff(tariffData);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Ошибка при сохранении тарифа:', error);
      alert(`Ошибка: ${error.message}`);
    }
  };

  const sortTariffsByDuration = (tariffs) => {
    const order = ['1 тренировка', '4 тренировки', '7 тренировок', '8 тренировок', '10 тренировок'];
    return [...tariffs].sort((a, b) => order.indexOf(a.duration) - order.indexOf(b.duration));
  };

  const groupedTariffs = tariffsData.reduce((acc, tariff) => {
    if (tariff && tariff.category) {
      if (!acc[tariff.category]) acc[tariff.category] = [];
      acc[tariff.category].push(tariff);
    }
    return acc;
  }, {});

  const getGroupedByType = (tariffs) => {
    const grouped = tariffs.reduce((acc, tariff) => {
      if (tariff && tariff.type) {
        if (!acc[tariff.type]) acc[tariff.type] = [];
        acc[tariff.type].push(tariff);
      }
      return acc;
    }, {});

    Object.keys(grouped).forEach(type => {
      grouped[type] = sortTariffsByDuration(grouped[type]);
    });

    return grouped;
  };

  const getCategoryLabel = (category) => {
    return categoryOptions.find(opt => opt.value === category)?.label || category;
  };

  const getTypeLabel = (category, type) => {
    return typeOptions[category]?.find(opt => opt.value === type)?.label || type;
  };

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">Ошибка: {error.message}</div>;

  return (
    <div className="admin-prices">
      <div className="admin-header">
        <h2>Управление ценами</h2>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          Добавить тариф
        </button>
      </div>

      <div className="admin-table-container">
        {Object.keys(groupedTariffs).length === 0 ? (
          <div className="no-data">Тарифы отсутствуют</div>
        ) : (
          Object.entries(groupedTariffs).map(([category, categoryTariffs]) => {
            const typeGroups = getGroupedByType(categoryTariffs || []);

            return (
              <div key={category}>
                <h3 className="category-title">{getCategoryLabel(category)}</h3>

                {Object.entries(typeGroups).map(([type, typeTariffs]) => (
                  <div key={type} className="type-section">
                    <h4 className="type-title">{getTypeLabel(category, type)}</h4>

                    <table className="admin-table" aria-hidden={window.innerWidth < 425}>
                      <thead>
                        <tr>
                          <th>Длительность</th>
                          <th>Цена (руб.)</th>
                          <th>Действия</th>
                        </tr>
                      </thead>
                      <tbody>
                        {typeTariffs.map(item => (
                          <tr key={item.id}>
                            <td><div className="tariff-duration">{item.duration}</div></td>
                            <td><div className="tariff-price">{item.price} руб.</div></td>
                            <td>
                              <div className="action-buttons">
                                <button
                                  className="btn btn-edit"
                                  onClick={() => handleOpenModal(item)}
                                >
                                  Редактировать
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className="cards-list" aria-hidden={window.innerWidth >= 425}>
                      {typeTariffs.map(item => (
                        <div key={item.id} className="admin-card">
                          <div className="card-field">
                            <strong>Длительность:</strong>
                            <span>{item.duration}</span>
                          </div>
                          <div className="card-field">
                            <strong>Цена:</strong>
                            <span>{item.price} руб.</span>
                          </div>
                          <div className="card-actions">
                            <button
                              className="btn btn-edit"
                              onClick={() => handleOpenModal(item)}
                            >
                              Редактировать
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            );
          })
        )}
      </div>

      {/* Модальное окно — без изменений */}
      {modalOpen && (
        <div className="modal-overlay" key={editingTariff ? editingTariff.id : 'create'}>
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">
                {editingTariff ? 'Редактировать тариф' : 'Добавить тариф'}
              </h3>
              <button className="btn-close" onClick={handleCloseModal}>×</button>
            </div>
            <form className="admin-form" onSubmit={handleSubmit}>
              {/* ... остальные поля формы ... */}
              <div className="form-group">
                <label htmlFor="category">Категория *</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  {categoryOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="type">Тип *</label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                >
                  {(typeOptions[formData.category] || []).map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="duration">Длительность *</label>
                <select
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Выберите длительность</option>
                  {durationOptions.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="name">Название услуги *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="price">Цена (руб.) *</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {editingTariff ? 'Сохранить' : 'Создать'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPrices;