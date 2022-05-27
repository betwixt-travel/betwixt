import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
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
    </div>
  );
}
