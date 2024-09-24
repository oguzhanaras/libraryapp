import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function AuthorDetail() {
    const { state } = useLocation();
    const navigate = useNavigate();

    const author = state?.author;

    const deleteAuthor = async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/authors/${author.id}`);
            alert("Yazar başarıyla silindi.");
            navigate("/authors");
        } catch (error) {
            alert("Silme işlemi sırasında bir hata oluştu: " + error.message);
        }
    };

    const editAuthor = () => {
        navigate(`/authors/edit/${author.id}`);
    };

    if (!author) {
        return <p>Yazar bilgisi bulunamadı.</p>;
    }

    return (
        <div>
            <h2>Yazar Detayı</h2>
            <p><strong>İsim:</strong> {author.name}</p>
            <p><strong>Doğum Tarihi:</strong> {author.birthDate}</p>
            <p><strong>Ülke:</strong> {author.country}</p>
            <button onClick={editAuthor}>Güncelle</button>
            <button onClick={deleteAuthor}>Sil</button>
        </div>
    );
}

export default AuthorDetail;
