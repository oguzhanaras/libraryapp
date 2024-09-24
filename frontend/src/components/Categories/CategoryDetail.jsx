// CategoryDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CategoryDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategory = async () => {
        try {
            const response = await axios.get(
            `${import.meta.env.VITE_APP_BASE_URL}/api/v1/categories/${id}`
            );
            setCategory(response.data);
        } catch (error) {
            setError(error.message);
        }
        };

        fetchCategory();
    }, [id]);

    const handleDeleteCategory = async () => {
        try {
        await axios.delete(
            `${import.meta.env.VITE_APP_BASE_URL}/api/v1/categories/${id}`
        );
        navigate("/categories");
        } catch (error) {
        setError(error.message);
        }
    };

    if (error) return <div>Hata: {error}</div>;
    if (!category) return <div>Yükleniyor...</div>;

    return (
        <div>
        <h2>Kategori Detayları</h2>
        <p>
            <strong>İsim:</strong> {category.name}
        </p>
        <p>
            <strong>Açıklama:</strong> {category.description}
        </p>
        <button onClick={() => navigate(`/categories/edit/${id}`)}>Güncelle</button>
        <button onClick={handleDeleteCategory}>Sil</button>
        </div>
    );
};

export default CategoryDetail;