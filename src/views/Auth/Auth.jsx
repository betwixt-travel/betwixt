import React, { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { useAuth } from '../../hooks/useUser';
import styles from './Auth.css';
import toast from 'react-hot-toast';

export default function Auth() {
  const [isSigningIn, setIsSigningIn] = useState(true);
  const [error, setError] = useState('');
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
    try {
      const { email, password, firstname, lastname } = formState;
      isSigningIn
        ? await signIn(email, password)
        : await signUp(email, password, firstname, lastname);
    } catch (error) {
      toast.error(error.message);
    }
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
            first name:
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
            last name:
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
            email: *
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
            password: *
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              value={formState.password}
              onChange={handleChange}
            />
            <p className={styles.required}>* required</p>
          </label>
          <button>{text.title}</button>
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
      <p onClick={() => setIsSigningIn(false)} className={styles.toggle}>
        {text.switch}
      </p>
    </>
  ) : (
    <>
      {signUpFragment}
      <p onClick={() => setIsSigningIn(true)} className={styles.toggle}>
        {text.switch}
      </p>
    </>
  );
}
