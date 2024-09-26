import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './BorrowDetail.css';
import Notification from '../Notifications/Notification.jsx';

function BorrowDetail() {
    const { id } = useParams(); // URL'den borrows id'sini al
    const navigate = useNavigate();
    const [borrow, setBorrow] = useState(null);
    const [error, setError] = useState(null);
    const [notification, setNotification] = useState({ message: '', type: '' }); // Bildirim state'i

    useEffect(() => {
        const fetchBorrowDetail = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_APP_BASE_URL + `/api/v1/borrows/${id}`);
                setBorrow(response.data);
            } catch (error) {
                setError("Kiralama detayları yüklenirken bir hata oluştu: " + error.message);
            }
        };
        fetchBorrowDetail();
    }, [id]);

    const handleEdit = () => {
        navigate(`/borrows/edit/${id}`); // Güncelleme sayfasına yönlendir
    };

    const handleDelete = async () => {
        if (window.confirm("Bu kiralamayı silmek istediğinize emin misiniz?")) {
            try {
                await axios.delete(import.meta.env.VITE_APP_BASE_URL + `/api/v1/borrows/${id}`);
                setNotification({ message: 'Kiralama başarıyla silindi!', type: 'success' });
                setTimeout(() => {
                    navigate("/borrows"); // 2 saniye sonra borrows sayfasına yönlendir
                }, 2000); // 2 saniyelik bir gecikme
            } catch (error) {
                setError("Kiralama silinirken bir hata oluştu: " + error.message);
                setNotification({ message: 'Kiralama silinirken bir hata oluştu.', type: 'error' });
            }
        }
    };

    return (
        <div className="borrow-detail-container">
            <h2>Kiralama Detayları</h2>
            {notification.message && (
                <Notification message={notification.message} type={notification.type} />
            )}
            {error && <p className="error-message">{error}</p>}
            {borrow ? (
                <div>
                    <p>Kiralayan: {borrow.borrowerName}</p>
                    <p>Kiralayan E-posta: {borrow.borrowerMail}</p>
                    <p>Kiralama Tarihi: {borrow.borrowingDate}</p>
                    {borrow.book ? (
                        <div className="book-info">
                            <p>Kitap İsmi: {borrow.book.name}</p>
                            <p>Kitap Yayın Yılı: {borrow.book.publicationYear}</p>
                            <p>Stok Durumu: {borrow.book.stock > 0 ? "Stokta" : "Stok Dışarıda"}</p>
                        </div>
                    ) : (
                        <p>Kitap Bilgisi Bulunamadı</p>
                    )}
                    <button onClick={handleEdit} className="btn-edit">Güncelle</button>
                    <button onClick={handleDelete} className="btn-delete delete-btn">Sil</button>
                </div>
            ) : (
                <p>Yükleniyor...</p>
            )}
        </div>
    );
}

export default BorrowDetail;
