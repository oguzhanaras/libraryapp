// BorrowEdit.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

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
    const [successMessage, setSuccessMessage] = useState(null);

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
            setSuccessMessage("Kiralama bilgileri başarıyla güncellendi!");
            setTimeout(() => navigate(`/borrows/${id}`), 2000); // 2 saniye sonra yönlendir
        } catch (error) {
            setError("Kiralama güncellenirken bir hata oluştu: " + error.message);
        }
    };

    return (
        <>
            <h2>Kiralama Güncelle</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            <form onSubmit={handleUpdate}>
                <div>
                    <label>Kiralayan:</label>
                    <input
                        type="text"
                        name="borrowerName"
                        value={borrow.borrowerName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Kiralayan E-posta:</label>
                    <input
                        type="email"
                        name="borrowerMail"
                        value={borrow.borrowerMail}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Kiralama Tarihi:</label>
                    <input
                        type="date"
                        name="borrowingDate"
                        value={borrow.borrowingDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <button type="submit">Güncelle</button>
                </div>
            </form>
        </>
    );
}

export default BorrowEdit;
