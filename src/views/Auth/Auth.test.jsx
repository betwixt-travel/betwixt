import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';
import { UserProvider } from '../../context/userContext';
import { server } from '../../setupTests';
import { rest } from 'msw';
import { profileResponse } from '../../tests/fixtures/mockdata';
import { sector } from '@turf/turf';

describe('behavioral testing for auth page', () => {
  test.skip('should be able to sign in a user', async () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
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

    const homePageHeader = await screen.findByText('betwiXt');

    await screen.findByText('Welcome, upstanding');

    expect(homePageHeader).toBeInTheDocument();
  });
  test.skip('should be able to toggle to a sign up form and sign up a user', async () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <UserProvider>
          <App />
        </UserProvider>
      </MemoryRouter>
    );
    server.use(
      rest.patch(
        `${process.env.REACT_APP_SUPABASE_URL}/rest/v1/profiles`,
        (req, res, ctx) => {
          return res(ctx.json(profileResponse));
        }
      )
    );
    const signOut = screen.getByText('Sign Out');
    userEvent.click(signOut);

    const signIn = screen.getByText('Sign in or sign up!');
    userEvent.click(signIn);

    const toggle = screen.getByText('New user? Sign up here.');
    userEvent.click(toggle);
    const emailField = screen.getByPlaceholderText('email');
    const passwordField = screen.getByPlaceholderText('password');
    userEvent.type(emailField, 'testuser@testuser.com');
    userEvent.type(passwordField, 'testpassword');
    const submitButton = screen.getByRole('button', { name: 'Sign Up' });
    userEvent.click(submitButton);

    const homePageHeader = await screen.findByText('betwiXt');
    await screen.findByText('Welcome, upstanding');
    expect(homePageHeader).toBeInTheDocument();
  });
});
