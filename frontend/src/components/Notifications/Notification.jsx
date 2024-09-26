import React, { useEffect } from 'react';
import './Notification.css';

const Notification = ({ message, type, onClose }) => {
    if (!message) return null;

    // 2 saniye içinde otomatik kapanması
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000); // 3 saniye

        // yeni bildirim gösterildiğinde temizleme
        return () => clearTimeout(timer);
    }, [message, onClose]);

    return (
        <div className={`notification ${type}`}>
            <span>{message}</span>
            <button onClick={onClose}>X</button>
        </div>
    );
};

export default Notification;
