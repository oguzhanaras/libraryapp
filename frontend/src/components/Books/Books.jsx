import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; 
import './Books.css';

function Books() {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [error, setError] = useState(null);
    const [book, setBook] = useState({
        id: 0,
        name: '',
        publicationYear: '',
        stock: '',
        authorId: 0,
        publisherId: 0,
        categoryIds: []
    });
    const [authors, setAuthors] = useState([]);
    const [publishers, setPublishers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/books")
            .then((response) => {
                setBooks(response.data);
                setFilteredBooks(response.data);
            })
            .catch((error) => {
                setError(error.message);
            });

        axios.get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/authors").then(response => setAuthors(response.data));
        axios.get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/publishers").then(response => setPublishers(response.data));
        axios.get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/categories").then(response => setCategories(response.data));
    }, []);

    useEffect(() => {
        const results = books.filter(book =>
            book.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredBooks(results);
    }, [searchTerm, books]);

    const handleAddOrUpdateBook = () => {
        if (editIndex !== null) {
            const updatedBooks = [...books];
            updatedBooks[editIndex] = book;
            setBooks(updatedBooks);
            setEditIndex(null);
        } else {
            axios.post(import.meta.env.VITE_APP_BASE_URL + "/api/v1/books", {
                ...book,
                author: { id: book.authorId },
                publisher: { id: book.publisherId },
                categories: book.categoryIds.map(id => ({ id })),
            })
            .then(response => {
                setBooks([...books, response.data]);
            })
            .catch(error => {
                setError(error.message);
            });
        }
        setBook({
            id: 0,
            name: '',
            publicationYear: '',
            stock: '',
            authorId: 0,
            publisherId: 0,
            categoryIds: []
        });
    };

    const handleEditBook = (index) => {
        const selectedBook = books[index];
        setBook({
            ...selectedBook,
            authorId: selectedBook.author.id,
            publisherId: selectedBook.publisher.id,
            categoryIds: selectedBook.categories.map(cat => cat.id),
        });
        setEditIndex(index);
    };

    const handleDeleteBook = (id) => {
        axios.delete(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/books/${id}`)
            .then(() => {
                setBooks(books.filter(book => book.id !== id));
            })
            .catch(error => {
                setError(error.message);
            });
    };

    if (error) return <div>Hata: {error}</div>;

    return (
        <>
            <h2>Kitaplar</h2>
            <div className="book-side">
                <div className="books-container">
                    <h6>Kitap Ara</h6>
                    <div className="books-input">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Kitap adı ile ara..."
                            className="search-input"
                        />
                    </div>
                    <h6>Kitap Ekle</h6>
                    <div className="books-input">
                        <input
                            type="text"
                            value={book.name}
                            onChange={(e) => setBook({ ...book, name: e.target.value })}
                            placeholder="Kitap Adı"
                        />
                        <input
                            type="number"
                            value={book.publicationYear}
                            onChange={(e) => setBook({ ...book, publicationYear: e.target.value })}
                            placeholder="Yayın Yılı"
                        />
                        <input
                            type="number"
                            value={book.stock}
                            onChange={(e) => setBook({ ...book, stock: e.target.value })}
                            placeholder="Stok"
                        />
                        <select
                            value={book.authorId}
                            onChange={(e) => setBook({ ...book, authorId: parseInt(e.target.value) })}
                        >
                            <option value={0}>Yazar Seçin</option>
                            {authors.map(author => (
                                <option key={author.id} value={author.id}>{author.name}</option>
                            ))}
                        </select>
                        <select
                            value={book.publisherId}
                            onChange={(e) => setBook({ ...book, publisherId: parseInt(e.target.value) })}
                        >
                            <option value={0}>Yayınevi Seçin</option>
                            {publishers.map(publisher => (
                                <option key={publisher.id} value={publisher.id}>{publisher.name}</option>
                            ))}
                        </select>
                        <select
                            multiple
                            value={book.categoryIds}
                            onChange={(e) => setBook({ ...book, categoryIds: Array.from(e.target.selectedOptions, option => option.value) })}
                        >
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                        <button onClick={handleAddOrUpdateBook}>
                            {editIndex !== null ? 'Güncelle' : 'Ekle'}
                        </button>
                    </div>
                    <p>Kitap Sayısı: {filteredBooks.length}</p>
                </div>
            </div>
            <div className="books-list">
                {filteredBooks.map((book) => (
                    <Link to={`/books/${book.id}`} className="book-card" key={book.id}>
                        <div className="book-cover">
                            <h3>{book.name}</h3>
                            <h6>Yazar: {book.author.name}</h6>
                            <span>Yayınevi: {book.publisher.name}</span>
                            <p>Yayın Yılı: {book.publicationYear}</p>
                            <p>Stok: {book.stock}</p>
                            <h6>Kategoriler:</h6>
                            <ul>
                                {book.categories.map(category => (
                                    <li key={category.id}>{category.name}</li>
                                ))}
                            </ul>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}

export default Books;
