import React, { useState, useEffect } from 'react';
import { useCoaches } from '../../hooks/useCoaches';
import '../../styles/admin/AdminCommon.css';
import imageCompression from 'browser-image-compression';

const AdminCoaches = () => {
  const { coaches, loading, error, createCoach, updateCoach, deleteCoach } = useCoaches();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoach, setEditingCoach] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    education: '',
    specialization: '',
    merits: '',
    experience: '',
    phone: '',
    description: '',
    photo: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [currentPhotoUrl, setCurrentPhotoUrl] = useState(null);

  useEffect(() => {
    if (editingCoach) {
      setFormData({
        fullName: editingCoach.fullName || '',
        education: editingCoach.education || '',
        specialization: editingCoach.specialization || '',
        merits: editingCoach.merits || '',
        experience: editingCoach.experience || '',
        phone: editingCoach.phone || '',
        description: editingCoach.description || '',
        photo: null
      });
      setImagePreview(null);
      setCurrentPhotoUrl(editingCoach.photo);
    } else {
      setCurrentPhotoUrl(null);
    }
  }, [editingCoach]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    
    if (!file) {
      setImagePreview(null);
      setFormData(prev => ({
        ...prev,
        photo: null
      }));
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('Файл слишком большой! Максимальный размер: 10MB');
      e.target.value = ''; 
      return;
    }

    try {
      const compressedFile = await compressImage(file);
      
      setFormData(prev => ({
        ...prev,
        photo: compressedFile
      }));
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(compressedFile);

    } catch (error) {
      console.error('Ошибка обработки файла:', error);
      alert('Ошибка при обработке изображения');
    }
  };

  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 800,
      useWebWorker: true,
      fileType: 'image/jpeg',
      quality: 1           
    };

    try {
      if (file.size <= 3 * 1024 * 1024) {
        return file;
      }

      console.log('Сжатие изображения...');
      const compressedFile = await imageCompression(file, options);
      
      console.log('Изображение сжато', 
        `Исходный: ${(file.size / 1024 / 1024).toFixed(2)}MB →`,
        `Новый: ${(compressedFile.size / 1024 / 1024).toFixed(2)}MB`
      );
      
      return compressedFile;
    } catch (error) {
      console.error('Ошибка сжатия:', error);
      return file;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!editingCoach && !formData.photo) {
      alert('Пожалуйста, загрузите фотографию тренера');
      return;
    }
    
    const submitData = new FormData();
    submitData.append('fullName', formData.fullName);
    submitData.append('education', formData.education);
    submitData.append('specialization', formData.specialization);
    submitData.append('merits', formData.merits);
    submitData.append('experience', formData.experience.toString());
    submitData.append('phone', formData.phone);
    submitData.append('description', formData.description);
    
    if (formData.photo) {
      submitData.append('photo', formData.photo);
    }

    try {
      if (editingCoach) {
        await updateCoach(editingCoach.id, submitData);
      } else {
        await createCoach(submitData);
      }
      
      setIsModalOpen(false);
      setEditingCoach(null);
      setFormData({
        fullName: '',
        education: '',
        specialization: '',
        merits: '',
        experience: '',
        phone: '',
        description: '',
        photo: null
      });
      setImagePreview(null);
      setCurrentPhotoUrl(null);
    } catch (error) {
      console.error('Ошибка при сохранении тренера:', error);
      alert(`Ошибка при сохранении: ${error.message}`);
    }
  };

  const handleEdit = (coach) => {
    setEditingCoach(coach);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этого тренера?')) {
      try {
        await deleteCoach(id);
      } catch (error) {
        console.error('Ошибка при удалении тренера:', error);
        alert(`Ошибка при удалении: ${error.message}`);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCoach(null);
    setFormData({
      fullName: '',
      education: '',
      specialization: '',
      merits: '',
      experience: '',
      phone: '',
      description: '',
      photo: null
    });
    setImagePreview(null);
    setCurrentPhotoUrl(null);
  };

  const getPreviewSource = () => {
    if (imagePreview) {
      return imagePreview;
    }
    if (currentPhotoUrl) {
      return currentPhotoUrl;
    }
    return null;
  };

  const truncate = (str, len) => str?.length > len ? `${str.substring(0, len)}...` : str || '';
  
  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">Ошибка: {error.message}</div>;

  return (
    <div className="admin-coaches">
      <div className="admin-header">
        <h2>Управление тренерами</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          Добавить тренера
        </button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table" aria-hidden={window.innerWidth < 425}>
          <thead>
            <tr>
              <th>Имя</th>
              <th>Специализация</th>
              <th>Стаж</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {coaches.map(coach => (
              <tr key={coach.id}>
                <td>{coach.fullName}</td>
                <td>{truncate(coach.specialization, 30)}</td>
                <td>{coach.experience} лет</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn btn-edit" onClick={() => handleEdit(coach)}>Редактировать</button>
                    <button className="btn btn-delete" onClick={() => handleDelete(coach.id)}>Удалить</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="cards-list" aria-hidden={window.innerWidth >= 425}>
          {coaches.length === 0 ? (
            <div className="no-data">Нет тренеров</div>
          ) : (
            coaches.map(coach => (
              <div key={coach.id} className="admin-card">
                <div className="card-field">
                  <strong>Имя:</strong>
                  <span>{coach.fullName}</span>
                </div>
                <div className="card-field">
                  <strong>Специализация:</strong>
                  <span>{truncate(coach.specialization, 55)}</span>
                </div>
                <div className="card-field">
                  <strong>Стаж:</strong>
                  <span>{coach.experience} лет</span>
                </div>
                <div className="card-actions">
                  <button className="btn btn-edit" onClick={() => handleEdit(coach)}>Редактировать</button>
                  <button className="btn btn-delete" onClick={() => handleDelete(coach.id)}>Удалить</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className='modal-title'>{editingCoach ? 'Редактирование тренера' : 'Добавление тренера'}</h3>
              <button className="btn-close" onClick={handleCloseModal}>×</button>
            </div>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-group">
                <label htmlFor="fullName">Полное имя *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="education">Образование *</label>
                <textarea
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  required
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label htmlFor="specialization">Специализация *</label>
                <textarea
                  id="specialization"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  required
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label htmlFor="merits">Достижения *</label>
                <textarea
                  id="merits"
                  name="merits"
                  value={formData.merits}
                  onChange={handleInputChange}
                  required
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label htmlFor="experience">Стаж (лет) *</label>
                <input
                  type="number"
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  required
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Телефон</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+7 (XXX) XXX-XX-XX"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="description">Описание *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="5"
                />
              </div>

              <div className="form-group">
                <label htmlFor="photo">Фото {!editingCoach && '*'}</label>
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  onChange={handleFileChange}
                  accept="image/*"
                  required={!editingCoach}
                />
                
                {(getPreviewSource() || currentPhotoUrl) && (
                  <div className="image-preview">
                    <p>{imagePreview ? 'Новое фото:' : 'Текущее фото:'}</p>
                    <img 
                      src={getPreviewSource()} 
                      alt="Превью" 
                      className="preview-thumb"
                      onError={(e) => {
                        console.error('Ошибка загрузки изображения');
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                
                {editingCoach && !imagePreview && (
                  <p className="help-text">
                    Оставьте поле пустым, чтобы сохранить текущее фото
                  </p>
                )}
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {editingCoach ? 'Сохранить изменения' : 'Добавить тренера'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCoaches;