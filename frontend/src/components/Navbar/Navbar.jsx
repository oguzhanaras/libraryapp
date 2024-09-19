import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/books">Books</Link>
            </li>
            <li>
                <Link to="/publishers">Publishers</Link>
            </li>
            <li>
                <Link to="/categories">categories</Link>
            </li>
        </ul>
        </nav>
    );
};

export default Navbar;
