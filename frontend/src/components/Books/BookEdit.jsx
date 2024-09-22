import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

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

    // yazar yayınevi ve kategori listeleri
    const [authors, setAuthors] = useState([]);
    const [publishers, setPublishers] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/books/${id}`);
                setBook(response.data);
            } catch (error) {
                setError(error.message);
            }
        };

        // yazarları al
        const fetchAuthors = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/authors`);
                setAuthors(response.data);
            } catch (error) {
                setError(error.message);
            }
        };

        // yayınevlerini al
        const fetchPublishers = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/publishers`);
                setPublishers(response.data);
            } catch (error) {
                setError(error.message);
            }
        };

        // kategorileri al
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/categories`);
                setCategories(response.data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchBook();
        fetchAuthors();
        fetchPublishers();
        fetchCategories();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setBook((prevBook) => ({
            ...prevBook,
            [name]: value,
        }));
    };

    const handleCategoryChange = (index, value) => {
        const updatedCategories = [...book.categories];
        updatedCategories[index] = { ...updatedCategories[index], id: value };
        setBook((prevBook) => ({
            ...prevBook,
            categories: updatedCategories,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/books/${id}`, book);
            navigate('/books');
        } catch (error) {
            setError(error.message);
        }
    };

    if (error) return <div>Hata: {error}</div>;
    if (!book) return <div>Yükleniyor...</div>;

    return (
        <div>
            <h2>Kitap Düzenle</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Kitap Adı:</label>
                    <input type="text" name="name" value={book.name} onChange={handleChange} />
                </div>
                <div>
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
                        <option value="" disabled selected>
                            Yazar Seç
                        </option>
                        {authors.map((author) => (
                            <option key={author.id} value={author.id}>
                                {author.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
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
                        <option value="" disabled selected>
                            Yayınevi Seç
                        </option>
                        {publishers.map((publisher) => (
                            <option key={publisher.id} value={publisher.id}>
                                {publisher.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Yayın Yılı:</label>
                    <input type="number" name="publicationYear" value={book.publicationYear} onChange={handleChange} />
                </div>
                <div>
                    <label>Stok:</label>
                    <input type="number" name="stock" value={book.stock} onChange={handleChange} />
                </div>
                <div>
                    <h6>Kategoriler:</h6>
                    {book.categories.map((category, index) => (
                        <select
                            key={category.id}
                            value={category.id}
                            onChange={(e) => handleCategoryChange(index, parseInt(e.target.value))}
                        >
                            <option value="" disabled selected>
                                Kategori Seç
                            </option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    ))}
                </div>
                <button type="submit">Kaydet</button>
                <button type="button" onClick={() => navigate('/books')}>
                    İptal
                </button>
            </form>
        </div>
    );
}

export default BookEdit;
