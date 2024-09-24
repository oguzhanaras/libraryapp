import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function PublisherEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        establishmentYear: "",
        address: "",
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
        .get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/publishers/${id}`)
        .then((response) => {
            setFormData(response.data);
        })
        .catch((error) => {
            setError(error.message);
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

        // güncelle
        axios
        .put(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/publishers/${id}`, formData)
        .then(() => {
            navigate(`/publishers/${id}`); // güncelleme sonrası detay sayfasına geri dön
        })
        .catch((error) => {
            setError(error.message);
        });
    };

    if (error) return <div>Hata: {error}</div>;

    return (
        <form onSubmit={updatePublisher}>
        <h2>Publisher Düzenle</h2>
        <label htmlFor="name">Ad:</label>
        <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
        />

        <label htmlFor="establishmentYear">Kuruluş Yılı:</label>
        <input
            type="text"
            name="establishmentYear"
            value={formData.establishmentYear}
            onChange={handleInputChange}
        />

        <label htmlFor="address">Adres:</label>
        <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
        ></textarea>

        <button type="submit">Güncelle</button>
        </form>
    );
}

export default PublisherEdit;