import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';
import { UserProvider } from '../../context/userContext';

describe('behavioral testing for home page', () => {
  test.only('should be able to sign in a user', async () => {
    render(
      <MemoryRouter>
        <UserProvider>
          {' '}
          <App />
        </UserProvider>
      </MemoryRouter>
    );
    const travelerOneName = screen.getByPlaceholderText('Name for Traveler 1');
    const travelerOneZip = screen.getByPlaceholderText('Zip for Traveler 1');
    const travelerTwoName = screen.getByPlaceholderText('Name for Traveler 2');
    const travelerTwoZip = screen.getByPlaceholderText('Zip for Traveler 2');

    userEvent.type(travelerOneName, 'Denver');
    userEvent.type(travelerOneZip, '97214');
    userEvent.type(travelerTwoName, `Denver's Grandma`);
    userEvent.type(travelerTwoZip, '92008');
    screen.debug();

    const submitButton = screen.getByText(`Let's go!`);
    userEvent.click(submitButton);

    const results = await screen.findByText('Results');

    screen.debug();
  });
  test.skip('Should handle an error for an invalid zip', async () => {
    render(
      <MemoryRouter>
        <UserProvider>
          <App />
        </UserProvider>
      </MemoryRouter>
    );
  });
});
