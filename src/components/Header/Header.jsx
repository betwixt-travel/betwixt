import React from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useUser';
import styles from './Header.css'

export default function Header() {
  const { signOut, userSignedIn, user } = useAuth();
  const history = useHistory();
  const location = useLocation();
  const onAuthPage = location.pathname === '/auth';
  return (
    <header className={styles.header}>
      <NavLink to="/">
        <h1>betwiXt</h1>
      </NavLink>
      {!onAuthPage &&
        (userSignedIn ? (
          <div className={styles.nav}>
            <p>Welcome, {user.first_name || 'traveler'}</p>
            <NavLink to="/profile">Profile</NavLink>
            <button onClick={signOut}>Sign Out</button>
          </div>
        ) : (
          <NavLink className={styles.auth} to="/auth">Sign in or sign up!</NavLink>
        ))}
    </header>
  );
}
