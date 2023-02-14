import { client, parseData } from './client';

export function getUser() {
  return client.auth.user();
}

export function getSession() {
  return client.auth.session();
}

function handleError({ user, error }) {
  if (error) throw error;
  return user;
}

export async function signInUser(email, password) {
  const response = await client.auth.signIn({ email, password });
  return handleError(response);
}

const url = process.env.REACT_APP_API_URL;

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

export async function signOutUser() {
  const response = await client.auth.signOut();
  handleError(response);
}

export const createProfile = async (id, first_name, last_name) => {
  const resp = await client
    .from('profiles')
    .update({ first_name, last_name })
    .match({ id })
    .single();
  return parseData(resp);
};
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
