import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(prevState => !prevState);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <h1>Library</h1>
            </div>
            <div className="navbar-toggle" onClick={toggleMenu}>
                ☰
            </div>
            <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
                <li>
                    <Link to="/" onClick={toggleMenu}>Home</Link>
                </li>
                <li>
                    <Link to="/books" onClick={toggleMenu}>Books</Link>
                </li>
                <li>
                    <Link to="/borrows" onClick={toggleMenu}>Borrows</Link>
                </li>
                <li>
                    <Link to="/publishers" onClick={toggleMenu}>Publishers</Link>
                </li>
                <li>
                    <Link to="/categories" onClick={toggleMenu}>Categories</Link>
                </li>
                <li>
                    <Link to="/authors" onClick={toggleMenu}>Authors</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
