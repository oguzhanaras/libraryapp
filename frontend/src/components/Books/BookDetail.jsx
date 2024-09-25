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
                setNotification({ message: 'Kitap başarıyla silindi.', type: 'success' }); // Başarı mesajı
                // Yönlendirmeyi 2 saniye sonra yapıyoruz ki bildirim gösterilsin
                setTimeout(() => {
                    navigate('/books');
                }, 2000); // 2 saniye sonra yönlendirme
            } catch (error) {
                setNotification({ message: `Silme işlemi sırasında bir hata oluştu: ${error.message}`, type: 'error' }); // Hata mesajı
            }
        }
    };

    const closeNotification = () => {
        setNotification({ message: '', type: '' });
    };

    if (error) return <div>Hata: {error}</div>;
    if (!book) return <div>Yükleniyor...</div>;

    return (
        <div className="book-detail">
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
            
            {/* Bildirim componenti */}
            <Notification 
                message={notification.message} 
                type={notification.type} 
                onClose={closeNotification} 
            />
        </div>
    );
};

export default BookDetail;
