import React, { useState, useEffect } from 'react';
import { useGallery } from '../../hooks/useGallery';
import { useCoaches } from '../../hooks/useCoaches';
import '../../styles/admin/AdminCommon.css';

const AdminGallery = () => {
  const { coaches } = useCoaches();
  const [selectedCoachId, setSelectedCoachId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [formData, setFormData] = useState({
    caption: '',
    order: 0,
    photo: null
  });
  const [imagePreview, setImagePreview] = useState(null);

  const {
    gallery,
    loading,
    error,
    addPhoto,
    updatePhoto,
    deletePhoto,
    updateOrder,
    loadGallery
  } = useGallery(selectedCoachId);

  useEffect(() => {
    if (editingPhoto) {
      setFormData({
        caption: editingPhoto.caption || '',
        order: editingPhoto.order || 0,
        photo: null
      });
    }
  }, [editingPhoto]);

  useEffect(() => {
    if (selectedCoachId) {
      loadGallery();
    }
  }, [selectedCoachId]);

  const handleCoachChange = (e) => {
    setSelectedCoachId(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        photo: file
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      console.log('=== SUBMIT DEBUG ===');
      console.log('selectedCoachId:', selectedCoachId);
      console.log('editingPhoto:', editingPhoto);
      console.log('formData:', formData);
    
      if (!selectedCoachId) {
        alert('Пожалуйста, выберите тренера');
        return;
      }
      if (!editingPhoto && !formData.photo) {
        alert('Пожалуйста, загрузите фотографию');
        return;
      }
    
      const submitData = new FormData();
      submitData.append('caption', formData.caption);
      submitData.append('order', formData.order.toString());
      if (formData.photo) {
        submitData.append('photo', formData.photo);
      }
    
      // Проверка FormData
      for (let [key, value] of submitData.entries()) {
        console.log(`FormData: ${key} =`, value);
      }
    
      try {
        if (editingPhoto) {
          console.log('Updating photo:', editingPhoto.id);
          await updatePhoto(editingPhoto.id, submitData);
        } else {
          console.log('Adding new photo for coach:', selectedCoachId);
          await addPhoto(submitData); // ✅ coachId уже передается через хук
        }
        handleCloseModal();
      } catch (error) {
        console.error('Ошибка при сохранении фотографии:', error);
        alert(`Ошибка: ${error.message}`);
      }
};
  const handleEdit = (photo) => {
    setEditingPhoto(photo);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить эту фотографию?')) {
      try {
        await deletePhoto(id);
      } catch (error) {
        console.error('Ошибка при удалении:', error);
        alert(`Ошибка: ${error.message}`);
      }
    }
  };

  const handleReorder = async (direction, index) => {
    if (!gallery.length) return;

    const newGallery = [...gallery];
    if (direction === 'up' && index > 0) {
      [newGallery[index], newGallery[index - 1]] = [newGallery[index - 1], newGallery[index]];
    } else if (direction === 'down' && index < newGallery.length - 1) {
      [newGallery[index], newGallery[index + 1]] = [newGallery[index + 1], newGallery[index]];
    }

    const orderItems = newGallery.map((item, idx) => ({
      id: item.id,
      order: idx
    }));

    try {
      await updateOrder(orderItems);
    } catch (error) {
      console.error('Ошибка при изменении порядка:', error);
      alert(`Ошибка: ${error.message}`);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPhoto(null);
    setFormData({ caption: '', order: 0, photo: null });
    setImagePreview(null);
  };

  const selectedCoach = coaches.find(coach => coach.id === parseInt(selectedCoachId));

  if (loading && !gallery.length) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;

  return (
    <div className="admin-gallery">
      <div className="admin-header">
        <h2>Управление галереей</h2>

        <div className="coach-selector">
          <label htmlFor="coachSelect">Выберите тренера:</label>
          <select
            id="coachSelect"
            value={selectedCoachId}
            onChange={handleCoachChange}
            className="form-select"
          >
            <option value="">-- Выберите тренера --</option>
            {coaches.map(coach => (
              <option key={coach.id} value={coach.id}>
                {coach.fullName}
              </option>
            ))}
          </select>
        </div>

        {selectedCoachId && (
          <button
            className="btn btn-primary"
            onClick={() => setIsModalOpen(true)}
            disabled={!selectedCoachId}
          >
            Добавить фото
          </button>
        )}
      </div>

      {selectedCoachId && (
        <>
          <div className="gallery-info">
            <h3>Галерея: {selectedCoach?.fullName}</h3>
            <p>Количество фотографий: {gallery.length}</p>
          </div>

          <div className="admin-table-container">
            {gallery.length === 0 ? (
              <div className="no-data">Нет фотографий. Добавьте первую!</div>
            ) : (
              <>
                {/* === Таблица (на >425px) === */}
                <table className="admin-table" aria-hidden={window.innerWidth < 425}>
                  <thead>
                    <tr>
                      <th>Фото</th>
                      <th>Подпись</th>
                      <th>Порядок</th>
                      <th>Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gallery.map((photo, index) => (
                      <tr key={photo.id}>
                        <td>
                          <img
                            src={photo.fullPhotoUrl}
                            alt={photo.caption || 'Фото'}
                            className="gallery-thumb"
                          />
                        </td>
                        <td>
                          <div className="caption-cell">
                            {photo.caption || 'Без подписи'}
                          </div>
                        </td>
                        <td>
                          <div className="order-controls">
                            <button
                              className="btn btn-sm btn-order"
                              onClick={() => handleReorder('up', index)}
                              disabled={index === 0}
                              title="Поднять выше"
                            >
                              ↑
                            </button>
                            <span className="order-number">{photo.order}</span>
                            <button
                              className="btn btn-sm btn-order"
                              onClick={() => handleReorder('down', index)}
                              disabled={index === gallery.length - 1}
                              title="Опустить ниже"
                            >
                              ↓
                            </button>
                          </div>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="btn btn-edit"
                              onClick={() => handleEdit(photo)}
                            >
                              Редактировать
                            </button>
                            <button
                              className="btn btn-delete"
                              onClick={() => handleDelete(photo.id)}
                            >
                              Удалить
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* === Карточки (на <425px) === */}
                <div className="cards-list" aria-hidden={window.innerWidth >= 425}>
                  {gallery.map((photo, index) => (
                    <div key={photo.id} className="admin-card">
                      <div className="card-field">
                        <img
                          src={photo.fullPhotoUrl}
                          alt="Фото"
                          className="preview-thumb"
                        />
                      </div>
                      <div className="card-field">
                        <strong>Подпись:</strong>
                        <span>{photo.caption || 'Без подписи'}</span>
                      </div>
                      <div className="card-field">
                        <strong>Порядок:</strong>
                        <div className="order-controls">
                          <button
                            className="btn btn-sm btn-order"
                            onClick={() => handleReorder('up', index)}
                            disabled={index === 0}
                          >
                            ↑
                          </button>
                          <span>{photo.order}</span>
                          <button
                            className="btn btn-sm btn-order"
                            onClick={() => handleReorder('down', index)}
                            disabled={index === gallery.length - 1}
                          >
                            ↓
                          </button>
                        </div>
                      </div>
                      <div className="card-actions">
                        <button
                          className="btn btn-edit"
                          onClick={() => handleEdit(photo)}
                        >
                          Редактировать
                        </button>
                        <button
                          className="btn btn-delete"
                          onClick={() => handleDelete(photo.id)}
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </>
      )}

      {/* Модальное окно — без изменений */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">
                {editingPhoto ? 'Редактирование фото' : 'Добавление фото'}
                {selectedCoach && ` - ${selectedCoach.fullName}`}
              </h3>
              <button className="btn-close" onClick={handleCloseModal}>×</button>
            </div>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-group">
                <label htmlFor="caption">Подпись</label>
                <textarea
                  id="caption"
                  name="caption"
                  value={formData.caption}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Описание фотографии (необязательно)"
                />
              </div>
              <div className="form-group">
                <label htmlFor="order">Порядок отображения</label>
                <input
                  type="number"
                  id="order"
                  name="order"
                  value={formData.order}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
              <div className="form-group">
                <label htmlFor="photo">Фото {!editingPhoto && '*'}</label>
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  onChange={handleFileChange}
                  accept="image/*"
                  required={!editingPhoto}
                />
                {imagePreview && (
                  <div className="image-preview">
                    <p>Превью:</p>
                    <img src={imagePreview} alt="Превью" className="preview-thumb" />
                  </div>
                )}
                {editingPhoto && !imagePreview && (
                  <div className="current-image">
                    <p>Текущее фото:</p>
                    <img
                      src={editingPhoto.fullPhotoUrl}
                      alt="Текущее"
                      className="preview-thumb"
                    />
                  </div>
                )}
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {editingPhoto ? 'Сохранить' : 'Добавить'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGallery;
