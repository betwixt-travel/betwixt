import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <NavLink to="/">
        <h1>betwiXt</h1>
      </NavLink>
      <ul className={styles.nav}>
        <li>
          <NavLink to="/auth">Auth</NavLink>
        </li>
        <li>
          <NavLink to="/results">Results</NavLink>
        </li>
        <li>
          <NavLink to="/profile">Profile</NavLink>
        </li>
      </ul>
    </header>
  );
}
