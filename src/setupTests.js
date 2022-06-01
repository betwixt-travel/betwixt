import fetch from 'cross-fetch';
global.fetch = fetch;

import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { mockedUser, profileResponse } from './tests/fixtures/mockdata';
const server = setupServer(
  rest.post(
    `${process.env.REACT_APP_SUPABASE_URL}/auth/v1/token`,
    (req, res, ctx) => {
      return res(ctx.json(mockedUser));
    }
  ),
  rest.post(
    `${process.env.REACT_APP_SUPABASE_URL}/auth/v1/signup`,
    (req, res, ctx) => {
      return res(ctx.json(mockedUser));
    }
  ),
  rest.patch(
    `${process.env.REACT_APP_SUPABASE_URL}/rest/v1/profiles`,
    (req, res, ctx) => {
      return res(ctx.json(profileResponse));
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
