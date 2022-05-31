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

    //removed this portion of the test until github testing issue is resolved
    const homePageHeader = await screen.findByText('Home');
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

    //removed this portion of the test until github testing issue is resolved
    const homePageHeader = await screen.findByText('Home');
    expect(homePageHeader).toBeInTheDocument();
  });
});

// test('should test', () => {
//   expect(1).toEqual(1);
// });
