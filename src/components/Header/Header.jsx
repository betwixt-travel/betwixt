import React from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../../services/user';
import styles from './Header.css'

export default function Header() {
  const isUser = getUser();
  console.log('isUser', isUser);
  
  return (
    <header className={styles.header}>
      <NavLink to="/">
        <h1>betwiXt</h1>
      </NavLink>

      <ul className={styles.nav}>
        {
          isUser ?
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li> :
          <li>
            <NavLink to="/auth">Auth</NavLink>
          </li>
        }
      </ul>
    </header>
  );
}
