import fetch from 'cross-fetch';
global.fetch = fetch;
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { mockedUser } from './tests/fixtures/mockdata';

const server = setupServer(
  rest.post('https://kyyzdtelzuxgssnlsorf.supabase.co/auth/v1/token',
  (req, res, ctx) => {
    return res(ctx.json(mockedUser));
  }), 
    rest.post('https://kyyzdtelzuxgssnlsorf.supabase.co/auth/v1/signup',
    (req, res, ctx) => {
      return res(ctx.json(mockedUser));
    }),
    rest.patch('https://kyyzdtelzuxgssnlsorf.supabase.co/rest/v1/profiles',
    (req, res, ctx) => {
      return res(ctx.json(mockedUser));
    }),
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());