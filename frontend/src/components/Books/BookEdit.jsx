import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Notification from '../Notifications/Notification.jsx';
import './BookEdit.css';

function BookEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState({
        name: '',
        author: { id: '', name: '' },
        publisher: { id: '', name: '' },
        publicationYear: '',
        stock: '',
        categories: [],
    });
    const [error, setError] = useState(null);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [authors, setAuthors] = useState([]);
    const [publishers, setPublishers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [bookRes, authorsRes, publishersRes, categoriesRes] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/books/${id}`),
                    axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/authors`),
                    axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/publishers`),
                    axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/categories`),
                ]);
                setBook(bookRes.data);
                setAuthors(authorsRes.data);
                setPublishers(publishersRes.data);
                setCategories(categoriesRes.data);
                setLoading(false);
            } catch (error) {
                setNotification({ message: 'Veri yüklenirken hata oluştu.', type: 'error' });
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook((prevBook) => ({ ...prevBook, [name]: value }));
    };

    const handleCategoryChange = (index, value) => {
        const updatedCategories = [...book.categories];
        updatedCategories[index] = { ...updatedCategories[index], id: value };
        setBook((prevBook) => ({ ...prevBook, categories: updatedCategories }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/books/${id}`, book);
            setNotification({ message: 'Kitap başarıyla güncellendi!', type: 'success' });
            
            // Yönlendirmeyi 3 saniye sonra gerçekleştir
            setTimeout(() => {
                navigate('/books');
            }, 3000);  // 3 saniye bekleme süresi
        } catch (error) {
            setNotification({ message: 'Güncelleme sırasında bir hata oluştu.', type: 'error' });
            setError(error.message);
        }
    };

    if (loading) return <div className="loading">Yükleniyor...</div>;
    if (error) return <div className="error">Hata: {error}</div>;

    return (
        <div className="book-edit-container">
            <h2>Kitap Düzenle</h2>
            <Notification
                message={notification.message}
                type={notification.type}
                onClose={() => setNotification({ message: '', type: '' })}
            />
            <form onSubmit={handleSubmit} className="book-edit-form">
                <div className="form-group">
                    <label>Kitap Adı:</label>
                    <input type="text" name="name" value={book.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Yazar:</label>
                    <select
                        name="author"
                        value={book.author.id}
                        onChange={(e) =>
                            setBook((prevBook) => ({
                                ...prevBook,
                                author: authors.find((author) => author.id === parseInt(e.target.value)),
                            }))
                        }
                    >
                        <option value="" disabled>Yazar Seç</option>
                        {authors.map((author) => (
                            <option key={author.id} value={author.id}>
                                {author.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Yayınevi:</label>
                    <select
                        name="publisher"
                        value={book.publisher.id}
                        onChange={(e) =>
                            setBook((prevBook) => ({
                                ...prevBook,
                                publisher: publishers.find((publisher) => publisher.id === parseInt(e.target.value)),
                            }))
                        }
                    >
                        <option value="" disabled>Yayınevi Seç</option>
                        {publishers.map((publisher) => (
                            <option key={publisher.id} value={publisher.id}>
                                {publisher.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Yayın Yılı:</label>
                    <input type="number" name="publicationYear" value={book.publicationYear} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Stok:</label>
                    <input type="number" name="stock" value={book.stock} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <h6>Kategoriler:</h6>
                    {book.categories.map((category, index) => (
                        <select
                            key={index} // id yerine index kullanmak daha güvenli
                            value={category.id}
                            onChange={(e) => handleCategoryChange(index, parseInt(e.target.value))}
                        >
                            <option value="" disabled>Kategori Seç</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    ))}
                </div>
                <div className="form-actions">
                    <button type="submit" className="save-btn">Kaydet</button>
                    <button type="button" className="cancel-btn" onClick={() => navigate('/books')}>İptal</button>
                </div>
            </form>
        </div>
    );
}

export default BookEdit;
