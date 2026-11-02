import React from 'react';
import logo from '../assets/logo.png';
import './Navbar.css';

const Navbar = () => {
    return (
        <header className='cabecera'>
            <div className='container'>
                <img src={logo} alt="logo" />
            </div>
        </header>
    );
};

export default Navbar;
