// Categories.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Categories() {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        // kategorileri çekme
        axios
        .get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/categories")
        .then((response) => {
            setCategories(response.data);
        })
        .catch((error) => {
            setError(error.message);
        });
    }, []);

    const handleInputChange = (e) => {
        // form verilerini güncelleme
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    const addCategory = (e) => {
        e.preventDefault();

        // kategori ekleme
        axios
        .post(import.meta.env.VITE_APP_BASE_URL + "/api/v1/categories", formData)
        .then((response) => {
            setCategories([...categories, response.data]);
            setFormData({
            name: "",
            description: "",
            });
        })
        .catch((error) => {
            setError(error.message);
        });
    };

    if (error) return <div>Hata: {error}</div>;

    return (
        <div>
            <h2>Kategori Ekle</h2>
            <form onSubmit={addCategory}>
                <div>
                <label htmlFor="name">Kategori İsmi:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
                </div>
                <div>
                <label htmlFor="description">Açıklama:</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                />
                </div>
                <button type="submit">Kategori Ekle</button>
            </form>

            <h2>Mevcut Kategoriler</h2>
            <div>
                {categories.map((category) => (
                    <Link to={`/categories/${category.id}`} key={category.id}>
                        <div>
                            <h3>{category.name}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Categories;