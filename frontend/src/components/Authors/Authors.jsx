import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        <>
            <h2>Authors</h2>
            <h6>Author Ekle</h6>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={addAuthor}>
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
                <button type="submit">Add Author</button>
            </form>
            {authors.map((author) => (
                <div key={author.id} onClick={() => goToAuthorDetail(author)}>
                    <h3>{author.name}</h3>
                    <p>{author.birthDate}</p>
                    <p>{author.country}</p>
                </div>
            ))}
        </>
    );
}

export default Authors;
