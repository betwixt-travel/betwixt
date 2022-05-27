import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';
import { UserProvider } from '../../context/userContext';

describe('behavioral testing for auth page', () => {
  test('should be able to sign in a user', async () => {
    render(
      <MemoryRouter initialEntries={['/auth']}>
        <UserProvider>
          {' '}
          <App />
        </UserProvider>
      </MemoryRouter>
    );
    const emailField = screen.getByPlaceholderText('email');
    const passwordField = screen.getByPlaceholderText('password');
    userEvent.type(emailField, 'denver@denver.com');
    userEvent.type(passwordField, 'password');
    const submitButton = screen.getByRole('button', { name: 'Sign In' });
    userEvent.click(submitButton);
    const homePageHeader = await screen.findByText('Home');
    expect(homePageHeader).toBeInTheDocument();
  });
  test('should be able to toggle to a sign up form and sign up a user', () => {});
});
