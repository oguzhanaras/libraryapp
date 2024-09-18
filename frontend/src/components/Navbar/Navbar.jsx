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
                <Link to="/books">Books</Link> {/* Books sayfasına yönlendirme */}
            </li>
        </ul>
        </nav>
    );
};

export default Navbar;
