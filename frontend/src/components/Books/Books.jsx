import React, { useEffect, useState } from "react";
import axios from "axios";

const Books = () => {

    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/books")
        .then((response) => {
            setBooks(response.data);
        })
        .catch((error) => {
            setError(error.message);
        });
    }, []);

    if (error) return <div>Hata: {error}</div>;

    return (
        <>
            <h2>Books</h2>
            <ul>
                {books.map(book => (
                <li key={book.id}>
                    {book.name}
                </li>
                ))}
            </ul>
        </>
    );
};

export default Books;
