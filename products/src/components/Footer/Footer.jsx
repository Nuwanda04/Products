import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>ShopEase</h3>
          <p>Your one-stop shop for all your needs.</p>
        </div>
        
        <div className={styles.footerSection}>
          <h4>Quick Links</h4>
          <ul className={styles.footerLinks}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/about">About Us</Link></li>
          </ul>
        </div>
        
        <div className={styles.footerSection}>
          <h4>Contact Us</h4>
          <p>Email: info@shopease.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
      </div>
      
      <div className={styles.footerBottom}>
        <div className={styles.footerBottomContent}>
          <p>&copy; {currentYear} ShopEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
