import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
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
    await waitForElementToBeRemoved(submitButton);
    const homePageHeader = await screen.findByText(
      'Home',
      {},
      { timeout: '5000' }
    );
    expect(homePageHeader).toBeInTheDocument();
  });
  test('should be able to toggle to a sign up form and sign up a user', async () => {
    render(
      <MemoryRouter initialEntries={['/auth']}>
        <UserProvider>
          <App />
        </UserProvider>
      </MemoryRouter>
    );
    const toggle = screen.getByText('New user? Sign up here.');
    userEvent.click(toggle);
    const emailField = screen.getByPlaceholderText('email');
    const passwordField = screen.getByPlaceholderText('password');
    userEvent.type(emailField, 'testuser@testuser.com');
    userEvent.type(passwordField, 'testpassword');
    const submitButton = screen.getByRole('button', { name: 'Sign Up' });
    userEvent.click(submitButton);
    await waitForElementToBeRemoved(submitButton);

    const homePageHeader = await screen.findByText(
      'Home',
      {},
      { timeout: '5000' }
    );
    expect(homePageHeader).toBeInTheDocument();
  });
});
