import React from 'react';

function NotFound() {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>404 - Sayfa Bulunamadı</h1>
            <p>Aradığınız sayfa mevcut değil.</p>
            <a href="/">Ana Sayfaya Dön</a>
        </div>
    );
}

export default NotFound;
