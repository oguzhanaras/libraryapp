import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './PublisherDetail.css';
import Notification from "../Notifications/Notification";

function PublisherDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [publisher, setPublisher] = useState(null);
    const [error, setError] = useState(null);
    const [notification, setNotification] = useState({ message: '', type: '' }); // Bildirim state'i

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/publishers/${id}`)
            .then((response) => {
                setPublisher(response.data);
            })
            .catch((error) => {
                setError(error.message);
                setNotification({ message: 'Yayınevi bilgileri yüklenirken hata oluştu: ' + error.message, type: 'error' });
            });
    }, [id]);

    const deletePublisher = () => {
        axios
            .delete(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/publishers/${id}`)
            .then(() => {
                setNotification({ message: 'Yayınevi başarıyla silindi!', type: 'success' });
                setTimeout(() => {
                    navigate("/publishers"); // 2 saniye bekledikten sonra yönlendirme
                }, 2000);
            })
            .catch((error) => {
                setError(error.message);
                setNotification({ message: 'Silme sırasında hata oluştu: ' + error.message, type: 'error' });
            });
    };

    const handleNotificationClose = () => {
        setNotification({ message: '', type: '' });
    };

    if (error) return <div className="error">Hata: {error}</div>;
    if (!publisher) return <div>Yükleniyor...</div>;

    return (
        <>
            {/* Bildirim Bileşeni */}
            {notification.message && (
                <Notification message={notification.message} type={notification.type} onClose={handleNotificationClose} />
            )}

            <div className="publisher-detail">
                <h2>Yayınevi Detayları</h2>
                <p><strong>Ad:</strong> {publisher.name}</p>
                <p><strong>Kuruluş Yılı:</strong> {publisher.establishmentYear}</p>
                <p><strong>Adres:</strong> {publisher.address}</p>
                <div className="button-container">
                    <button className="action-button" onClick={() => navigate(`/publishers/edit/${id}`)}>Düzenle</button>
                    <button className="action-button" onClick={deletePublisher}>Sil</button>
                </div>
            </div>
        </>
    );
}

export default PublisherDetail;
