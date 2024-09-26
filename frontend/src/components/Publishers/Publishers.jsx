import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './Publisher.css';
import Notification from '../Notifications/Notification.jsx';

function Publishers() {
    const [publishers, setPublishers] = useState([]);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        establishmentYear: "",
        address: "",
    });
    const [notification, setNotification] = useState({ message: '', type: '' }); // Bildirim state'i

    useEffect(() => {
        axios
            .get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/publishers")
            .then((response) => {
                setPublishers(response.data);
            })
            .catch((error) => {
                setError(error.message);
                setNotification({ message: 'Yayınevleri yüklenirken bir hata oluştu: ' + error.message, type: 'error' });
            });
    }, []);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const addPublisher = (e) => {
        e.preventDefault();

        axios
            .post(import.meta.env.VITE_APP_BASE_URL + "/api/v1/publishers", formData)
            .then((response) => {
                setPublishers([...publishers, response.data]);
                setFormData({
                    name: "",
                    establishmentYear: "",
                    address: "",
                });
                setNotification({ message: 'Yayınevi başarıyla eklendi!', type: 'success' });
            })
            .catch((error) => {
                setError(error.message);
                setNotification({ message: 'Yayınevi eklenirken bir hata oluştu: ' + error.message, type: 'error' });
            });
    };

    // Bildirimi kapatmak için onClose fonksiyonu
    const closeNotification = () => {
        setNotification({ message: '', type: '' });
    };

    return (
        <>
            <h2>Yayınevleri</h2>
            {/* Bildirim Bileşeni */}
            {notification.message && (
                <Notification message={notification.message} type={notification.type} onClose={closeNotification} />
            )}

            <form className="publisher-form" method="post" onSubmit={addPublisher}>
                <input
                    className="form-input"
                    type="text"
                    name="name"
                    placeholder="Yayınevi adı"
                    value={formData.name}
                    onChange={handleInputChange}
                />
                <input
                    className="form-input"
                    type="text"
                    name="establishmentYear"
                    placeholder="Kuruluş yılı"
                    value={formData.establishmentYear}
                    onChange={handleInputChange}
                />
                <textarea
                    className="form-textarea"
                    name="address"
                    placeholder="Adresinizi girin"
                    value={formData.address}
                    onChange={handleInputChange}
                ></textarea>
                <button className="form-button" type="submit">Ekle</button>
            </form>

            {/* Yayınevleri Listesi */}
            <ul className="publisher-list">
                {publishers.map((publisher) => (
                    <Link to={`/publishers/${publisher.id}`} key={publisher.id}>
                        <li className="publisher-item">{publisher.name}</li>
                    </Link>
                ))}
            </ul>
        </>
    );
}

export default Publishers;
