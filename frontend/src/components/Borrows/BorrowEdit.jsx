import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Notification from '../Notifications/Notification';
import './BorrowEdit.css';

function BorrowEdit() {
    const { id } = useParams(); // URL'den borrows id'sini al
    const navigate = useNavigate();
    const [borrow, setBorrow] = useState({
        borrowerName: '',
        borrowerMail: '',
        borrowingDate: '',
        book: null, // Kitap nesnesi
    });
    const [error, setError] = useState(null);
    const [notification, setNotification] = useState({ message: '', type: '' });

    useEffect(() => {
        const fetchBorrowDetail = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_APP_BASE_URL + `/api/v1/borrows/${id}`);
                setBorrow(response.data);
            } catch (error) {
                setNotification({ message: `Kiralama detayları yüklenirken bir hata oluştu: ${error.message}`, type: 'error' });
            }
        };
        fetchBorrowDetail();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBorrow((prevBorrow) => ({
            ...prevBorrow,
            [name]: value,
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(import.meta.env.VITE_APP_BASE_URL + `/api/v1/borrows/${id}`, borrow);
            setNotification({ message: 'Kiralama bilgileri başarıyla güncellendi!', type: 'success' });
            setTimeout(() => navigate(`/borrows/${id}`), 2000); // 2 saniye sonra yönlendir
        } catch (error) {
            setNotification({ message: `Kiralama güncellenirken bir hata oluştu: ${error.message}`, type: 'error' });
        }
    };

    const handleCloseNotification = () => {
        setNotification({ message: '', type: '' });
    };

    return (
        <div className="borrow-edit-container">
            <h2>Kiralama Güncelle</h2>

            <Notification
                message={notification.message}
                type={notification.type}
                onClose={handleCloseNotification}
            />

            <form onSubmit={handleUpdate}>
                <div className="form-group">
                    <label>Kiralayan:</label>
                    <input
                        type="text"
                        name="borrowerName"
                        value={borrow.borrowerName}
                        onChange={handleChange}
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Kiralayan E-posta:</label>
                    <input
                        type="email"
                        name="borrowerMail"
                        value={borrow.borrowerMail}
                        onChange={handleChange}
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Kiralama Tarihi:</label>
                    <input
                        type="date"
                        name="borrowingDate"
                        value={borrow.borrowingDate}
                        onChange={handleChange}
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn-submit">Güncelle</button>
                </div>
            </form>
        </div>
    );
}

export default BorrowEdit;
