import React, { useState, useContext } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { StateContext } from 'context/stateContext';
import styles from '../styles/header.module.css';

const Menu = () => {
    const router = useRouter()

    const { updateGlobalState } = useContext(StateContext);
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
      setIsOpen(false);
    };

    const handleLinkClick = () => {
      updateGlobalState(null);
    };

  return (
    <div className={styles.menuContainer}>
     
      <button
        className={`${styles.toggleBtn} ${isOpen ? styles.active : ''}`}
        onClick={toggleMenu}
      >
        <span className={styles.line}></span>
        <span className={styles.line}></span>
        <span className={styles.line}></span>
      </button>
        <nav className={`${styles.menu} ${isOpen ? styles.active : ''}`} onMouseLeave={closeMenu}>
          <ul>
            <li>
                <Link href="/" onClick={handleLinkClick} className={ router.pathname === '/' ? styles.active : ''}>
                    <h1>Style</h1>
                </Link>
            </li>
            <li>
                <Link href="/products" className={ router.pathname === '/products' ? styles.active : ''}>
                <h1>Products</h1>
                </Link>
            </li>            
            <li><a href="#"><h1>About Quality</h1></a></li>
            <li><a href="#"><h1>About Us</h1></a></li>
          </ul>
        </nav>
    </div>
  );
};

export default Menu;