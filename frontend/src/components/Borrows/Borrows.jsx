import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Borrows() {
    const [borrows, setBorrows] = useState([]);
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);
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
                const response = await axios.get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/borrows");
                setBorrows(response.data);
            } catch (error) {
                setError("Kiralama yapılırken bir hata oluştu: " + error.message);
            }
        };

        const fetchBooks = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/books"); // Kitaplar için API isteği
                setBooks(response.data);
            } catch (error) {
                setError("Kitapları alırken bir hata oluştu: " + error.message);
            }
        };

        fetchBorrows();
        fetchBooks();
    }, []);

    const handleViewDetail = (borrowId) => {
        navigate(`/borrows/${borrowId}`);
    };

    const handleEdit = (borrowId) => {
        navigate(`/borrows/edit/${borrowId}`);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewBorrow({ ...newBorrow, [name]: value });
    };

    const handleBookChange = (e) => {
        const selectedBook = books.find(book => book.id === Number(e.target.value));
        if (selectedBook) {
            setNewBorrow({
                ...newBorrow,
                bookForBorrowingRequest: {
                    id: selectedBook.id,
                    name: selectedBook.name,
                    publicationYear: selectedBook.publicationYear,
                    stock: selectedBook.stock
                }
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(import.meta.env.VITE_APP_BASE_URL + "/api/v1/borrows", newBorrow);
            setBorrows([...borrows, response.data]);
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
        } catch (error) {
            setError("Kiralama işlemi sırasında bir hata oluştu: " + error.message);
        }
    };

    return (
        <>
            <h2>Borrows</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <h6>Kiralama Formu</h6>
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
                <button type="submit">Kiralama Yap</button>
            </form>

            <h6>Kiralama Listesi</h6>
            {borrows.length === 0 ? (
                <p>Kiralama kaydı bulunamadı.</p>
            ) : (
                borrows.map((borrowItem) => (
                    <div key={borrowItem.id} style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
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
                        <button onClick={() => handleViewDetail(borrowItem.id)}>Detay</button>
                        <button onClick={() => handleEdit(borrowItem.id)} style={{ marginLeft: "10px" }}>Düzenle</button>
                    </div>
                ))
            )}
        </>
    );
}

export default Borrows;
