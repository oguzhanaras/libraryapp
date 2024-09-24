import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function PublisherDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [publisher, setPublisher] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // seçilen publisher detayları
        axios
        .get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/publishers/${id}`)
        .then((response) => {
            setPublisher(response.data);
        })
        .catch((error) => {
            setError(error.message);
        });
    }, [id]);

    const deletePublisher = () => {
        // publisher silme işlemi
        axios
        .delete(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/publishers/${id}`)
        .then(() => {
            navigate("/publishers"); // silme işlemi sonrası publishers listesine geri dön
        })
        .catch((error) => {
            setError(error.message);
        });
    };

    if (error) return <div>Hata: {error}</div>;
    if (!publisher) return <div>Yükleniyor...</div>;

    return (
        <div>
        <h2>Publisher Details</h2>
        <p><strong>Ad:</strong> {publisher.name}</p>
        <p><strong>Kuruluş Yılı:</strong> {publisher.establishmentYear}</p>
        <p><strong>Adres:</strong> {publisher.address}</p>
        
        <button onClick={() => navigate(`/publishers/edit/${id}`)}>Düzenle</button>
        <button onClick={deletePublisher}>Sil</button>
        </div>
    );
}

export default PublisherDetail;