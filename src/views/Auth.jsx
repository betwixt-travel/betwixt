import React from 'react';
import { useForm } from '../hooks/useForm'; 
import { useAuth } from '../hooks/useUser';

export default function Auth() {
  const inputs = {
    email: '',
    password: ''
  };
  const { formState, handleChange } = useForm(inputs);
  const { signUp } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formState;
    await signUp(email, password);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>
          email:
          <input 
            type='email'
            name='email'
            id='email'
            placeholder='email'
            value={formState.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='password'>
          password:
          <input 
            type='password'
            name='password'
            id='password'
            placeholder='password'
            value={formState.password}
            onChange={handleChange}
          />
        </label>
        <button>submit</button>
      </form>
    </>
  )
}
