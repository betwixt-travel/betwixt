export const profileResponse = {
  id: "12341234123456",
  created_at: "2022-05-28T00:08:33.670442+00:00",
  first_name: "upstanding",
  last_name: "citizen",
  home_lat: null,
  home_long: null,
  home_zip: null
}

export const mockedUser = {
  access_token: 'MOCKED_ACCESS_TOKEN',
  token_type: 'bearer',
  expires_in: 3600,
  refresh_token: 'MOCKED_REFRESH_TOKEN',
  user: {
    id: '123456',
    aud: 'authenticated',
    role: 'authenticated',
    email: 'testuser@testuser.com',
    email_confirmed_at: '2022-05-05T21:28:30.964653Z',
    phone: '',
    confirmed_at: '2022-05-05T21:28:30.964653Z',
    last_sign_in_at: '2022-05-11T00:34:05.132973068Z',
    app_metadata: {
      provider: 'email',
      providers: ['email'],
    },
    user_metadata: {},
    identities: [
      {
        id: '123456',
        user_id: '123456',
        identity_data: {
          sub: '123456',
        },
        provider: 'email',
        last_sign_in_at: '2022-05-05T21:28:30.963061Z',
        created_at: '2022-05-05T21:28:30.963104Z',
        updated_at: '2022-05-05T21:28:30.963107Z',
      },
    ],
    created_at: '2022-05-05T21:28:30.961027Z',
    updated_at: '2022-05-11T00:34:05.13409Z',
  },
};