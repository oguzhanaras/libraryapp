import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Author.css';

function Authors() {
    const [authors, setAuthors] = useState([]);
    const [error, setError] = useState(null);
    const [author, setAuthor] = useState({
        name: '',
        birthDate: '',
        country: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/authors");
                setAuthors(response.data);
            } catch (error) {
                setError("Yazarları yüklerken bir hata oluştu: " + error.message);
            }
        };
        fetchAuthors();
    }, []);

    const addAuthor = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(import.meta.env.VITE_APP_BASE_URL + "/api/v1/authors", author);
            setAuthors([...authors, response.data]); // Yeni eklenen yazarı listeye ekle
            setAuthor({ name: '', birthDate: '', country: '' }); // Formu temizle
        } catch (error) {
            setError("Yazar eklerken bir hata oluştu: " + error.message);
        }
    };

    const goToAuthorDetail = (author) => {
        navigate(`/authors/${author.id}`, { state: { author } });
    };

    return (
        <div className="authors-container">
            <h2>Yazarlar</h2>
            <h6>Yeni Yazar Ekle</h6>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={addAuthor} className="author-form">
                <input
                    type="text"
                    placeholder="İsim"
                    value={author.name}
                    onChange={(e) => setAuthor({ ...author, name: e.target.value })}
                    required
                />
                <input
                    type="date"
                    value={author.birthDate}
                    onChange={(e) => setAuthor({ ...author, birthDate: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Ülke"
                    value={author.country}
                    onChange={(e) => setAuthor({ ...author, country: e.target.value })}
                    required
                />
                <button type="submit">Yazar Ekle</button>
            </form>
            <div className="authors-list">
                {authors.map((author) => (
                    <div key={author.id} className="author-card" onClick={() => goToAuthorDetail(author)}>
                        <h3>{author.name}</h3>
                        <p>{author.birthDate}</p>
                        <p>{author.country}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Authors;
