// CategoryEdit.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function CategoryEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
        .get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/categories/${id}`)
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

    const handleSave = (e) => {
        e.preventDefault();

        axios
        .put(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/categories/${id}`, formData)
        .then(() => {
            navigate(`/categories/${id}`);
        })
        .catch((error) => {
            setError(error.message);
        });
    };

    if (error) return <div>Hata: {error}</div>;

    return (
        <form onSubmit={handleSave}>
        <div>
            <label>İsim:</label>
            <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            />
        </div>
        <div>
            <label>Açıklama:</label>
            <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            />
        </div>
        <button type="submit">Kaydet</button>
        </form>
    );
}

export default CategoryEdit;
