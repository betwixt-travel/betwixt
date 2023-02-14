import { client, parseData } from './client';
const url = process.env.REACT_APP_API_URL;

export async function getUser() {
  try {
    const user = await fetch(url + '/api/v1/users/me', {
      credentials: 'include',
    });
    const userData = await user.json();
    return userData;
  } catch (e) {
    return null;
  }
}

function handleError({ user, error }) {
  if (error) throw error;
  return user;
}

export async function signUpUser(email, password, firstName, lastName) {
  const user = await fetch(url + '/api/v1/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    mode: 'cors',
    body: JSON.stringify({ email, password, firstName, lastName }),
  });
  if (!user.ok) {
    throw new Error('Invalid email or password');
  }
  return await user.json();
}

export async function signInUser(email, password) {
  const user = await fetch(url + '/api/v1/users/sessions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    mode: 'cors',
    body: JSON.stringify({ email, password }),
  });
  if (!user.ok) {
    throw new Error('Invalid email or password');
  }
  return await user.json();
}

export async function signOutUser() {
  try {
    await fetch(url + '/api/v1/users/sessions', {
      method: 'DELETE',
      credentials: 'include',
    });
  } catch (error) {
    console.log(error);
  }
}

export const updateProfile = async ({ first_name, last_name, home_zip }) => {
  const id = getUser().id;
  const resp = await client
    .from('profiles')
    .update({ first_name, last_name, home_zip })
    .match({ id })
    .single();
  return parseData(resp);
};

export const fetchUserData = async () => {
  const resp = await client.from('profiles').select().single();

  return parseData(resp);
};
