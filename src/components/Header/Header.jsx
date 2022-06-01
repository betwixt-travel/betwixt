import React from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../../services/user';
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

      <ul className={styles.nav}>
        {
          isUser ?
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li> :
          <li>
            <NavLink to="/auth">Sign in or sign up!</NavLink>
          </li>
        }
      </ul>
      {!onAuthPage &&
        (userSignedIn ? (
          <>
            <p>Welcome {user.first_name || 'traveler'}</p>
            <button onClick={signOut}>Sign Out</button>
          </>
        ) : (
          <button onClick={() => history.push('/auth')}>Log In</button>
        ))}
    </header>
  );
}
