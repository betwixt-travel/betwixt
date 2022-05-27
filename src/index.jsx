import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './context/userContext';

render(
  <React.StrictMode>
    <UserProvider>
      <Router>
        <App />
      </Router>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
