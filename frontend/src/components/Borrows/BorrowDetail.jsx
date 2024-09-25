import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function BorrowDetail() {
    const { id } = useParams(); // URL'den borrows id'sini al
    const navigate = useNavigate();
    const [borrow, setBorrow] = useState(null);
    const [error, setError] = useState(null);

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
        navigate(`/borrow-edit/${id}`); // Güncelleme sayfasına yönlendir
    };

    const handleDelete = async () => {
        if (window.confirm("Bu kiralamayı silmek istediğinize emin misiniz?")) {
            try {
                await axios.delete(import.meta.env.VITE_APP_BASE_URL + `/api/v1/borrows/${id}`);
                alert("Kiralama başarıyla silindi!");
                navigate("/borrows"); // tekrar borrows sayfaya yönlendir
            } catch (error) {
                setError("Kiralama silinirken bir hata oluştu: " + error.message);
            }
        }
    };

    return (
        <>
            <h2>Kiralama Detayları</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {borrow ? (
                <div>
                    <p>Kiralayan: {borrow.borrowerName}</p>
                    <p>Kiralayan E-posta: {borrow.borrowerMail}</p>
                    <p>Kiralama Tarihi: {borrow.borrowingDate}</p>
                    {borrow.book ? (
                        <>
                            <p>Kitap İsmi: {borrow.book.name}</p>
                            <p>Kitap Yayın Yılı: {borrow.book.publicationYear}</p>
                            <p>Stok Durumu: {borrow.book.stock > 0 ? "Stokta" : "Stok Dışarıda"}</p>
                        </>
                    ) : (
                        <p>Kitap Bilgisi Bulunamadı</p>
                    )}
                    <button onClick={handleEdit}>Güncelle</button>
                    <button onClick={handleDelete}>Sil</button>
                </div>
            ) : (
                <p>Yükleniyor...</p>
            )}
        </>
    );
}

export default BorrowDetail;
