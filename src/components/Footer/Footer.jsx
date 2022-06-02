import React from 'react'
import { Link } from 'react-router-dom';
import styles from './Footer.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span>
        &copy; 2022 by betwiXt
      </span>
      <Link to='/about'>
        Meet the developers
      </Link>
    </footer>
  )
}
