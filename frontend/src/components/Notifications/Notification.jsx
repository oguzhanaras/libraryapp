// Notification.js
import React from 'react';
import './Notification.css';

const Notification = ({ message, type, onClose }) => {
    if (!message) return null;

    return (
        <div className={`notification ${type}`}>
        <span>{message}</span>
        <button onClick={onClose}>X</button>
        </div>
    );
};

export default Notification;
