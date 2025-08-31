import React, { useState, useEffect } from 'react';
import { useNews } from '../../hooks/useNews';
import '../../styles/admin/AdminCommon.css';

const AdminNews = () => {
  const { news, loading, error, createNews, updateNews, deleteNews, refresh } = useNews();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    extra: '',
    promo: false
  });

  // Добавляем проверку, что news всегда массив
  const newsData = Array.isArray(news) ? news : [];
  useEffect(() => {
    refresh();
  }, [refresh]);
  
  useEffect(() => {
    if (editingNews) {
      setFormData({
        title: editingNews.title || '',
        description: editingNews.description || '',
        extra: editingNews.extra || '',
        promo: editingNews.promo || false
      });
    }
  }, [editingNews]);

  const handleOpenModal = (newsItem = null) => {
    setEditingNews(newsItem);
    if (!newsItem) {
      setFormData({
        title: '',
        description: '',
        extra: '',
        promo: false
      });
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingNews(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingNews) {
        await updateNews(editingNews.id, formData);
      } else {
        await createNews(formData);
      }
      // После успешного сохранения обновляем список новостей
      await refresh();
      handleCloseModal();
    } catch (error) {
      console.error('Ошибка при сохранении новости:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить эту новость?')) {
      try {
        await deleteNews(id);
        // После удаления обновляем список новостей
        await refresh();
      } catch (error) {
        console.error('Ошибка при удалении новости:', error);
      }
    }
  };
  const truncate = (str, maxLength) => {
      if (!str) return '';
      return str.length > maxLength 
        ? `${str.substring(0, maxLength)}...` 
        : str;
    };
  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">Ошибка: {error.message}</div>;

  return (
    <div className="admin-news">
      <div className="admin-header">
        <h2>Управление новостями</h2>
        <button 
          className="btn btn-primary"
          onClick={() => handleOpenModal()}
        >
          Добавить новость
        </button>
      </div>

      <div className="admin-table-container">
          {/* Горизонтальная таблица (на больших экранах) */}
          <table className="admin-table" aria-hidden={window.innerWidth < 425}>
            <thead>
              <tr>
                <th>Заголовок</th>
                <th>Описание</th>
                <th>Дополнительно</th>
                <th>Промо</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {newsData.length === 0 ? (
                <tr>
                  <td colSpan="5" className="no-data">Новости не найдены</td>
                </tr>
              ) : (
                newsData.map(item => (
                  <tr key={item.id} className="table-row">
                    <td><div className="news-title">{item.title}</div></td>
                    <td><div className="news-description">{truncate(item.description, 100) || 'Нет описания'}</div></td>
                    <td><div className="news-extra">{truncate(item.extra, 50) || '-'}</div></td>
                    <td><div className="news-promo">{item.promo ? 'Да' : 'Нет'}</div></td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn btn-edit" onClick={() => handleOpenModal(item)}>Редактировать</button>
                        <button className="btn btn-delete" onClick={() => handleDelete(item.id)}>Удалить</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Вертикальные карточки (на маленьких экранах) */}
          <div className="cards-list" aria-hidden={window.innerWidth >= 425}>
            {newsData.length === 0 ? (
              <div className="no-data">Новости не найдены</div>
            ) : (
              newsData.map(item => (
                <div key={item.id} className="admin-card">
                  <div className="card-field">
                    <strong>Заголовок:</strong>
                    <span className="news-title">{item.title}</span>
                  </div>
                  <div className="card-field">
                    <strong>Описание:</strong>
                    <span className="news-description">{truncate(item.description, 40) || 'Нет описания'}</span>
                  </div>
                  <div className="card-field">
                    <strong>Дополнительно:</strong>
                    <span className="news-extra">{truncate(item.extra, 40) || '-'}</span>
                  </div>
                  <div className="card-field">
                    <strong>Промо:</strong>
                    <span>{item.promo ? 'Да' : 'Нет'}</span>
                  </div>
                  <div className="card-actions">
                    <button className="btn btn-edit" onClick={() => handleOpenModal(item)}>Редактировать</button>
                    <button className="btn btn-delete" onClick={() => handleDelete(item.id)}>Удалить</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className='modal-title'>{editingNews ? 'Редактировать новость' : 'Добавить новость'}</h3>
              <button className="btn-close" onClick={handleCloseModal}>×</button>
            </div>
            <form className="admin-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Заголовок *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
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
                  rows="4"
                />
              </div>
              <div className="form-group">
                <label htmlFor="extra">Дополнительная информация</label>
                <textarea
                  id="extra"
                  name="extra"
                  value={formData.extra}
                  onChange={handleInputChange}
                  rows="3"
                />
              </div>
              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="promo"
                    checked={formData.promo}
                    onChange={handleInputChange}
                  />
                  Промо-новость
                </label>
              </div>
              <div className="form-actions">
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  {editingNews ? 'Сохранить' : 'Создать'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNews;