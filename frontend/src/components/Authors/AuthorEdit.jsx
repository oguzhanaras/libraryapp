import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function AuthorEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [author, setAuthor] = useState({
        name: "",
        birthDate: "",
        country: "",
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAuthor = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/authors/${id}`);
                setAuthor(response.data);
            } catch (error) {
                setError("Yazar bilgileri yüklenirken hata oluştu: " + error.message);
            }
        };
        fetchAuthor();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/authors/${id}`, author);
            alert("Yazar başarıyla güncellendi.");
            navigate("/authors"); // Güncelleme sonrası ana sayfaya yönlendirme
        } catch (error) {
            setError("Güncelleme sırasında hata oluştu: " + error.message);
        }
    };

    return (
        <div>
            <h2>Yazar Güncelle</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleUpdate}>
                <input
                    type="text"
                    placeholder="Name"
                    value={author.name}
                    onChange={(e) => setAuthor({ ...author, name: e.target.value })}
                />
                <input
                    type="date"
                    placeholder="Birth Date"
                    value={author.birthDate}
                    onChange={(e) => setAuthor({ ...author, birthDate: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Country"
                    value={author.country}
                    onChange={(e) => setAuthor({ ...author, country: e.target.value })}
                />
                <button type="submit">Güncelle</button>
            </form>
        </div>
    );
}

export default AuthorEdit;
