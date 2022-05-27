import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { signInUser, signUpUser } from '../services/user';

const useAuth = () => {
  const context = useContext(UserContext);
  if (context === undefined) throw new Error('user context must be used with a provider');
  const { user, setUser} = context;

  const signIn = async (email, password) => {
    const response = await signInUser(email, password);
    setUser(response);
  }

  const signUp = async (email, password) => {
    const response = await signUpUser(email, password);
    setUser(response);
  }

  return { signIn, signUp}
}

export { useAuth }