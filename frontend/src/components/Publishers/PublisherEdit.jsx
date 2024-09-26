import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './PublisherEdit.css';
import Notification from "../Notifications/Notification";

function PublisherEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        establishmentYear: "",
        address: "",
    });
    const [error, setError] = useState(null);
    const [notification, setNotification] = useState({ message: '', type: '' }); // Bildirim state'i

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/publishers/${id}`)
            .then((response) => {
                setFormData(response.data);
            })
            .catch((error) => {
                setError(error.message);
                setNotification({ message: 'Yayınevi bilgileri yüklenirken hata oluştu: ' + error.message, type: 'error' });
            });
    }, [id]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const updatePublisher = (e) => {
        e.preventDefault();

        axios
            .put(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/publishers/${id}`, formData)
            .then(() => {
                setNotification({ message: 'Yayınevi başarıyla güncellendi!', type: 'success' });
                setTimeout(() => {
                    navigate(`/publishers/${id}`);
                }, 2000); // 2 saniye sonra yönlendirme
            })
            .catch((error) => {
                setError(error.message);
                setNotification({ message: 'Güncelleme sırasında hata oluştu: ' + error.message, type: 'error' });
            });
    };

    const handleNotificationClose = () => {
        setNotification({ message: '', type: '' });
    };

    if (error) return <div className="error">Hata: {error}</div>;

    return (
        <>
            {/* Bildirim Bileşeni */}
            {notification.message && (
                <Notification message={notification.message} type={notification.type} onClose={handleNotificationClose} />
            )}

            <form className="publisher-edit-form" onSubmit={updatePublisher}>
                <h2>Yayınevi Düzenle</h2>
                <input
                    className="form-input"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Yayınevi adı"
                />
                <input
                    className="form-input"
                    type="text"
                    name="establishmentYear"
                    value={formData.establishmentYear}
                    onChange={handleInputChange}
                    placeholder="Kuruluş Yılı"
                />
                <textarea
                    className="form-textarea"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Adresinizi girin"
                ></textarea>
                <button className="form-button" type="submit">Güncelle</button>
            </form>
        </>
    );
}

export default PublisherEdit;
