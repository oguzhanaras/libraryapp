import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './Borrows.css';
import Notification from '../Notifications/Notification.jsx';

function Borrows() {
    const [borrows, setBorrows] = useState([]);
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [newBorrow, setNewBorrow] = useState({
        borrowerName: '',
        borrowerMail: '',
        borrowingDate: new Date().toISOString().split('T')[0],
        bookForBorrowingRequest: {
            id: '',
            name: '',
            publicationYear: '',
            stock: ''
        }
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchBorrows = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/borrows`);
                setBorrows(response.data);
            } catch (error) {
                handleError("Kiralama yapılırken bir hata oluştu", error);
            }
        };

        const fetchBooks = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/books`);
                setBooks(response.data);
            } catch (error) {
                handleError("Kitapları alırken bir hata oluştu", error);
            }
        };

        fetchBorrows();
        fetchBooks();
    }, []);

    const handleError = (message, error) => {
        const errorMessage = `${message}: ${error.message}`;
        setError(errorMessage);
        setNotification({ message: errorMessage, type: 'error' });
    };

    const handleViewDetail = (borrowId) => {
        navigate(`/borrows/${borrowId}`);
    };

    const handleEdit = (borrowId) => {
        navigate(`/borrows/edit/${borrowId}`);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewBorrow(prev => ({ ...prev, [name]: value }));
    };

    const handleBookChange = (e) => {
        const selectedBook = books.find(book => book.id === Number(e.target.value));
        if (selectedBook) {
            setNewBorrow(prev => ({
                ...prev,
                bookForBorrowingRequest: {
                    id: selectedBook.id,
                    name: selectedBook.name,
                    publicationYear: selectedBook.publicationYear,
                    stock: selectedBook.stock
                }
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/borrows`, newBorrow);
            setBorrows(prev => [...prev, response.data]);
            resetNewBorrow();
            setNotification({ message: 'Kiralama işlemi başarıyla tamamlandı!', type: 'success' });
        } catch (error) {
            handleError("Kiralama işlemi sırasında bir hata oluştu", error);
        }
    };

    const resetNewBorrow = () => {
        setNewBorrow({
            borrowerName: '',
            borrowerMail: '',
            borrowingDate: new Date().toISOString().split('T')[0],
            bookForBorrowingRequest: {
                id: '',
                name: '',
                publicationYear: '',
                stock: ''
            }
        });
    };

    const handleCloseNotification = () => {
        setNotification({ message: '', type: '' });
    };

    return (
        <div className="borrows-container">
            <h2>Kiralama İşlemleri</h2>
            {error && <p className="error-message">{error}</p>}

            <Notification 
                message={notification.message} 
                type={notification.type} 
                onClose={handleCloseNotification} 
            />

            <div className="borrow-form">
                <h3>Kiralama Formu</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="borrowerName"
                        placeholder="Kiralayan Adı"
                        value={newBorrow.borrowerName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="borrowerMail"
                        placeholder="Kiralayan E-posta"
                        value={newBorrow.borrowerMail}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="date"
                        name="borrowingDate"
                        value={newBorrow.borrowingDate}
                        onChange={handleChange}
                        required
                    />
                    <select onChange={handleBookChange} required>
                        <option value="">Kitap Seçin</option>
                        {books.map((book) => (
                            <option key={book.id} value={book.id}>
                                {book.name} (Stok: {book.stock})
                            </option>
                        ))}
                    </select>
                    <button type="submit" className="submit-btn">Kiralama Yap</button>
                </form>
            </div>

            <h3>Kiralama Listesi</h3>
            {borrows.length === 0 ? (
                <p>Kiralama kaydı bulunamadı.</p>
            ) : (
                borrows.map((borrowItem) => (
                    <div key={borrowItem.id} className="borrow-item">
                        <p><strong>Kiralayan:</strong> {borrowItem.borrowerName}</p>
                        <p><strong>Kiralayan E-posta:</strong> {borrowItem.borrowerMail}</p>
                        <p><strong>Kiralama Tarihi:</strong> {borrowItem.borrowingDate}</p>
                        {borrowItem.book ? (
                            <>
                                <p><strong>Kitap İsmi:</strong> {borrowItem.book.name}</p>
                                <p><strong>Kitap Yayın Yılı:</strong> {borrowItem.book.publicationYear}</p>
                                <p><strong>Stok Durumu:</strong> {borrowItem.book.stock > 0 ? "Stokta" : "Stok Dışarıda"}</p>
                            </>
                        ) : (
                            <p>Kitap Bilgisi Bulunamadı</p>
                        )}
                        <button onClick={() => handleViewDetail(borrowItem.id)} className="detail-btn">Detay</button>
                        <button onClick={() => handleEdit(borrowItem.id)} className="edit-btn">Düzenle</button>
                    </div>
                ))
            )}
        </div>
    );
}

export default Borrows;
