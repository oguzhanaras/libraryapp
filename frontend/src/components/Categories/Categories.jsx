import React, { useEffect, useState } from "react";
import axios from "axios";

function Categories() {

    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        description: ""
    });

    useEffect(() => {
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
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    const addCategory = (e) => {
        e.preventDefault();

        axios
        .post(import.meta.env.VITE_APP_BASE_URL + "/api/v1/categories", formData)
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
            {categories.map((category) => {
                return (
                    <div key={category.id}>
                        <h3>{category.name}</h3>
                        <p>{category.description}</p>
                    </div>
                );
            })}
            <p>categories length: {categories.length}</p>
        </>
    )
}

export default Categories;