import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/books/${id}`);
                setBook(response.data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchBook();
    }, [id]);

    const handleDeleteBook = async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/books/${id}`);
            navigate('/books');
        } catch (error) {
            setError(error.message);
        }
    };

    if (error) return <div>Hata: {error}</div>;
    if (!book) return <div>Yükleniyor...</div>;

    return (
        <div>
            <h2>{book.name}</h2>
            <p>Yazar: {book.author.name}</p>
            <p>Yayınevi: {book.publisher.name}</p>
            <p>Yayın Yılı: {book.publicationYear}</p>
            <p>Stok: {book.stock}</p>
            <h6>Kategoriler:</h6>
            <ul>
                {book.categories.map(category => (
                    <li key={category.id}>{category.name}</li>
                ))}
            </ul>
            <button onClick={() => navigate(`/books/edit/${id}`)}>Düzenle</button>
            <button onClick={handleDeleteBook}>Sil</button>
        </div>
    );
};

export default BookDetail;
