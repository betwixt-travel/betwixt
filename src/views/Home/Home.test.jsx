import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';
import { UserProvider } from '../../context/userContext';

describe('behavioral testing for home page', () => {
  test('should render a list of results with links to a details page', async () => {
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
    const submitButton = screen.getByText(`Let's go!`);
    userEvent.click(submitButton);
    const sacremento = await screen.findByText(
      'Sacramento',
      {},
      { timeout: 2000 }
    );

    // TODO: mock endpoints for details page requests.
    userEvent.click(sacremento);
    const detailPageTitle = await screen.findByText(
      'Sacramento, California',
      {},
      { timeout: 2000 }
    );
    expect(detailPageTitle).toBeInTheDocument();
  });
  test('Should handle an error for an invalid zip', async () => {
    render(
      <MemoryRouter>
        <UserProvider>
          <App />
        </UserProvider>
      </MemoryRouter>
    );
    const travelerOneName = screen.getByPlaceholderText('Name for Traveler 1');
    const travelerOneZip = screen.getByPlaceholderText('Zip for Traveler 1');
    const travelerTwoName = screen.getByPlaceholderText('Name for Traveler 2');
    const travelerTwoZip = screen.getByPlaceholderText('Zip for Traveler 2');
    userEvent.type(travelerOneName, 'Denver');
    userEvent.type(travelerOneZip, 'Invalid Zip Code');
    userEvent.type(travelerTwoName, `Denver's Grandma`);
    userEvent.type(travelerTwoZip, '92000000000008');
    const submitButton = screen.getByText(`Let's go!`);
    userEvent.click(submitButton);
    await screen.findByText('Invalid zip code');
  });
});
