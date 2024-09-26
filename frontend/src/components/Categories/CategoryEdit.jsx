import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './CategoryEdit.css';

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

    if (error) return <div className="error">Hata: {error}</div>;

    return (
        <div className="category-edit-container">
            <h2>Kategori Düzenle</h2>
            <form onSubmit={handleSave} className="category-edit-form">
                <div className="form-group">
                    <label>İsim:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Açıklama:</label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Kaydet</button>
            </form>
        </div>
    );
}

export default CategoryEdit;
