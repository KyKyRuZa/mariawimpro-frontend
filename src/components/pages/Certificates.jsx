// Certificates.jsx
import React from 'react';
import './Style.css';

const Certificates = () => {
  const certificates = [
    {
      id: 1,
      title: 'Международный тренер по плаванию',
      issuer: 'FINA Academy',
      date: 'Март 2023',
      valid: true,
      img: '/certs/fina-cert.jpg',
    },
    {
      id: 2,
      title: 'Инструктор водной реабилитации',
      issuer: 'Российская школа плавания',
      date: 'Июнь 2022',
      valid: true,
      img: '/certs/rehab-cert.jpg',
    },
    {
      id: 3,
      title: 'Высшая квалификационная категория',
      issuer: 'Министерство спорта РФ',
      date: 'Октябрь 2024',
      valid: true,
      img: '/certs/rf-sport-cert.jpg',
    },
  ];

  return (
    <div className="certificates-container">
    <h1 className="main-title">СЕРТИФИКАТЫ</h1>
      <main className="certificates-grid">
        {certificates.map((cert) => (
          <div key={cert.id} className="cert-card">
            <img src={cert.img} alt={cert.title} className="cert-image" />
            <div className="cert-info">
              <h3>{cert.title}</h3>
              <p><strong>Выдан:</strong> {cert.issuer}</p>
              <p><strong>Дата:</strong> {cert.date}</p>
              <span className={`status ${cert.valid ? 'valid' : 'expired'}`}>
                {cert.valid ? 'Действителен' : 'Просрочен'}
              </span>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Certificates;