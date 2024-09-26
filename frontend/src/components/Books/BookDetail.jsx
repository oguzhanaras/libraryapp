import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Notification from '../Notifications/Notification.jsx';
import './BookDetail.css';

const BookDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [error, setError] = useState(null);
    const [notification, setNotification] = useState({ message: '', type: '' });

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
        const confirmDelete = window.confirm("Bu kitabı silmek istediğinizden emin misiniz?");
        if (confirmDelete) {
            try {
                await axios.delete(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/books/${id}`);
                setNotification({ message: 'Kitap başarıyla silindi.', type: 'success' });
                setTimeout(() => {
                    navigate('/books');
                }, 2000);
            } catch (error) {
                setNotification({ message: `Silme işlemi sırasında bir hata oluştu: ${error.message}`, type: 'error' });
            }
        }
    };

    const closeNotification = () => {
        setNotification({ message: '', type: '' });
    };

    if (error) return <div className="error-message">Hata: {error}</div>;
    if (!book) return <div className="loading-message">Yükleniyor...</div>;

    return (
        <div className="book-detail">
            <h2>{book.name}</h2>
            <p><strong>Yazar:</strong> <span>{book.author.name}</span></p>
            <p><strong>Yayınevi:</strong> <span>{book.publisher.name}</span></p>
            <p><strong>Yayın Yılı:</strong> <span>{book.publicationYear}</span></p>
            <p><strong>Stok:</strong> <span>{book.stock}</span></p>
            <h6>Kategoriler:</h6>
            <ul>
                {book.categories.map(category => (
                    <li key={category.id}>{category.name}</li>
                ))}
            </ul>
            <div className="button-group">
                <button className="edit-button" onClick={() => navigate(`/books/edit/${id}`)}>Düzenle</button>
                <button className="delete-button" onClick={handleDeleteBook}>Sil</button>
            </div>
            
            <Notification 
                message={notification.message} 
                type={notification.type} 
                onClose={closeNotification} 
            />
        </div>
    );
};

export default BookDetail;
