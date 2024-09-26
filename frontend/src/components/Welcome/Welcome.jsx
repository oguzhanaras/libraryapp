import React, { useEffect, useState } from "react";
import axios from "axios";
import './Welcome.css';

const WelcomePage = () => {
    const [authorsCount, setAuthorsCount] = useState(0);
    const [publishersCount, setPublishersCount] = useState(0);
    const [categoriesCount, setCategoriesCount] = useState(0);
    const [booksCount, setBooksCount] = useState(0);
    const [borrowsCount, setBorrowsCount] = useState(0);
    const [currentQuote, setCurrentQuote] = useState("");
    const [error, setError] = useState(null);

    // Kitap sözlerini tanımlama
    const quotes = {
        1: "Bir kitap, aklın en güzel yolculuğudur.",
        2: "Okumak, başka bir dünyayı keşfetmektir.",
        3: "Kitaplar, en iyi arkadaşlardır.",
        4: "Her kitap, yeni bir hikaye ve yeni bir bilgi sunar.",
        5: "Bir kitabın sayfalarını çevirmek, bir hayatın kapılarını açmaktır.",
        6: "Aşık olmaktan, hakikaten ve deli gibi sevmekten korkuyordu",
        7: "Ben iç dünyama dönüyorum. Orada hayal kırıklığına yer yok.",
        8: "Sevgisiz bir dünyanın yüreğimiz için ne anlamı olabilir?",
        9: "Unutmayın ki, dünya da en korkunç şey, ümidini kaybetmektir.",
        10: "Bir kitabın yanında yaşayan insanlar, bu kitabın yanında yaşayan insanların yanında yaşayan insanlardır."
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const authorsResponse = await axios.get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/authors");
                const publishersResponse = await axios.get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/publishers");
                const categoriesResponse = await axios.get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/categories");
                const booksResponse = await axios.get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/books");
                const borrowsResponse = await axios.get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/borrows");

                setAuthorsCount(authorsResponse.data.length);
                setPublishersCount(publishersResponse.data.length);
                setCategoriesCount(categoriesResponse.data.length);
                setBooksCount(booksResponse.data.length);
                setBorrowsCount(borrowsResponse.data.length);

                // İlk sözü rastgele seç
                const randomIndex = Math.floor(Math.random() * Object.keys(quotes).length) + 1;
                setCurrentQuote(quotes[randomIndex]);

                // 4 saniyede bir söz değişimi
                const interval = setInterval(() => {
                    const newRandomIndex = Math.floor(Math.random() * Object.keys(quotes).length) + 1;
                    setCurrentQuote(quotes[newRandomIndex]);
                }, 4000);

                // Temizleme fonksiyonu
                return () => clearInterval(interval);
            } catch (error) {
                setError("Verileri yüklerken bir hata oluştu: " + error.message);
            }
        };

        fetchData();
    }, []);

    if (error) return <div>{error}</div>;

    return (
        <div className="welcome-container">
            <h1>Hoş Geldiniz!</h1>
            <div className="stats-container">
                <div className="stat-card">
                    <h3>Yazarlar</h3>
                    <p>{authorsCount}</p>
                </div>
                <div className="stat-card">
                    <h3>Yayıncılar</h3>
                    <p>{publishersCount}</p>
                </div>
                <div className="stat-card">
                    <h3>Kategoriler</h3>
                    <p>{categoriesCount}</p>
                </div>
                <div className="stat-card">
                    <h3>Kitaplar</h3>
                    <p>{booksCount}</p>
                </div>
                <div className="stat-card">
                    <h3>Kiralama</h3>
                    <p>{borrowsCount}</p>
                </div>
            </div>
            <div className="quote-container">
                <h2>Rastgele Kitap Sözü</h2>
                <div className="quote-card">
                    <p>"{currentQuote}"</p>
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;
