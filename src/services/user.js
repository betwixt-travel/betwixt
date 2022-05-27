import { client } from './client';

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

export async function signUpUser(email, password) {
  const response = await client.auth.signUp({ email, password });
  return handleError(response);
}

export async function signOut() {
  const response = await client.auth.signOut();
  handleError(response);
}