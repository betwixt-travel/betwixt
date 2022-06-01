import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom';
import {} from 'react-router-dom/cjs/react-router-dom.min';
import { useAuth } from '../../hooks/useUser';

export default function Header() {
  const { signOut, userSignedIn } = useAuth();
  const history = useHistory();
  const location = useLocation();
  const onAuthPage = location.pathname === '/auth';
  return (
    <div>
      <Link to="/">
        <h1>betwiXt</h1>
      </Link>
      <ul style={{ listStyle: 'none' }}>
        <li>
          <Link to="/auth">Auth</Link>
        </li>
        <li>
          <Link to="/results">Results</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
      {!onAuthPage &&
        (userSignedIn ? (
          <button onClick={signOut}>Sign Out</button>
        ) : (
          <button onClick={() => history.push('/auth')}>Log In</button>
        ))}
    </div>
  );
}
