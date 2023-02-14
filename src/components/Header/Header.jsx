import React from 'react';
import { useHistory, useLocation, NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useUser';
import logo from '../../assets/images/logo.png';
import styles from './Header.css';

export default function Header() {
  const { signOut, userSignedIn, user } = useAuth();
  const history = useHistory();
  const location = useLocation();
  const onAuthPage = location.pathname === '/login';
  return (
    <header className={styles.header}>
      <div className={styles.navWrapper}>
        <NavLink to="/">
          <img alt="betwiXt" className={styles.logo} src={logo} />
        </NavLink>
        {!onAuthPage &&
          (userSignedIn ? (
            <div className={styles.nav}>
              <p>Welcome, {user.firstName || 'traveler'}</p>
              <NavLink exact to="/" className={styles.home}>
                Home
              </NavLink>
              <NavLink to="/profile">Profile</NavLink>
              <button className={styles.signOut} onClick={signOut}>
                Sign Out
              </button>
            </div>
          ) : (
            <NavLink className={styles.auth} to="/login">
              Sign in or sign up!
            </NavLink>
          ))}
      </div>
    </header>
  );
}
