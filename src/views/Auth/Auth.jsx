import React, { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { useAuth } from '../../hooks/useUser';
import styles from './Auth.css';

export default function Auth() {
  const [isSigningIn, setIsSigningIn] = useState(true);
  const inputs = {
    email: '',
    password: '',
    firstname: '',
    lastname: '',
  };
  const { formState, handleChange } = useForm(inputs);
  const { signUp, signIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, firstname, lastname } = formState;
    isSigningIn
      ? await signIn(email, password)
      : await signUp(email, password, firstname, lastname);
  };
  const text = isSigningIn
    ? { title: 'Sign In', switch: 'New user? Sign up here.' }
    : { title: 'Sign Up', switch: 'Already have an account? Sign in here.' };
  const signUpFragment = (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset className={styles.authForm}>
          {' '}
          <legend>{text.title}</legend>
          <label htmlFor="firstname">
            firstname:
            <input
              type="firstname"
              name="firstname"
              id="firstname"
              placeholder="firstname"
              value={formState.firstname}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="lastname">
            lastname:
            <input
              type="lastname"
              name="lastname"
              id="lastname"
              placeholder="lastname"
              value={formState.lastname}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="email">
            email:
            <input
              type="email"
              name="email"
              id="email"
              placeholder="email"
              value={formState.email}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="password">
            password:
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              value={formState.password}
              onChange={handleChange}
            />
          </label>
          <button>submit</button>
        </fieldset>
      </form>
    </>
  );
  const signInFragment = (
    <>
      {' '}
      <form onSubmit={handleSubmit}>
        <fieldset className={styles.authForm}>
          <legend>{text.title}</legend>
          <label htmlFor="email">
            email:
            <input
              type="email"
              name="email"
              id="email"
              placeholder="email"
              value={formState.email}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="password">
            password:
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              value={formState.password}
              onChange={handleChange}
            />
          </label>
          <button>{text.title}</button>
        </fieldset>
      </form>
    </>
  );

  return isSigningIn ? (
    <>
      {signInFragment}
      <p onClick={() => setIsSigningIn(false)}>{text.switch}</p>
    </>
  ) : (
    <>
      {signUpFragment}
      <p onClick={() => setIsSigningIn(true)}>{text.switch}</p>
    </>
  );
}
