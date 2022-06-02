import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';
import { UserProvider } from '../../context/userContext';

describe('behavioral testing for results page', () => {
  test('should render a list of results with links to a details page', async () => {
    render(
      <MemoryRouter
        initialEntries={'/city?lat=40.019444444&long=-105.292777777'}
      >
        <UserProvider>
          {' '}
          <App />
        </UserProvider>
      </MemoryRouter>
    );
    const loading = screen.getByText(/loading/i);
    loading.waitforElementto;
    screen.getByText(/boulder, co/i);
    screen.getByText(/Population: 108250/i);
    const imgs = screen.getAllByRole('img');
    expect(imgs.length).toEqual(10);
    screen.debug();
  });
});
