import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Publishers() {
    const [publishers, setPublishers] = useState([]);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        establishmentYear: "",
        address: "",
    });

    useEffect(() => {
        axios
        .get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/publishers")
        .then((response) => {
            setPublishers(response.data);
        })
        .catch((error) => {
            setError(error.message);
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
            // publisher guncelleme
            setPublishers([...publishers, response.data]);
            // form temizle
            setFormData({
            name: "",
            establishmentYear: "",
            address: "",
            });
        })
        .catch((error) => {
            setError(error.message);
        });
    };

    if (error) return <div>Hata: {error}</div>;

    return (
        <>
            <h2>Publishers</h2>
            <form method="post" onSubmit={addPublisher}>
                <label htmlFor="name">Adınız:</label>
                <input
                type="text"
                name="name"
                placeholder="Publisher name"
                value={formData.name}
                onChange={handleInputChange}
                />

                <label htmlFor="establishmentYear">Kuruluş yılı:</label>
                <input
                type="text"
                name="establishmentYear"
                value={formData.establishmentYear}
                onChange={handleInputChange}
                />

                <textarea
                name="address"
                placeholder="Adresinizi girin"
                value={formData.address}
                onChange={handleInputChange}
                ></textarea>

                <button type="submit">Ekle</button>
            </form>
            <ul>
                {publishers.map((publisher) => (
                    <Link to={`/publishers/${publisher.id}`} key={publisher.id}>
                        <li key={publisher.id}>{publisher.name}</li>
                    </Link>
                ))}
            </ul>
            <p>Total publishers: {publishers.length}</p>
        </>
    );
}

export default Publishers;