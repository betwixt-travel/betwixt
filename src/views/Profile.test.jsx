import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';
import { UserProvider } from '../../context/userContext';

describe('behavioral testing for profile page', () => {
  test('should render the user profile page', async () => {
    render(
      <MemoryRouter>
        <UserProvider>
          {' '}
          <App />
        </UserProvider>
      </MemoryRouter>
    );
    
  });
});
