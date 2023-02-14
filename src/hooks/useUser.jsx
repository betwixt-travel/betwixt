import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { signInUser, signUpUser, getUser, signOutUser } from '../services/user';

const useAuth = () => {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error('user context must be used with a provider');
  const { user, setUser } = context;
  const history = useHistory();

  const signIn = async (email, password) => {
    const response = await signInUser(email, password);
    const user = await getUser();
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    history.goBack();
  };

  const signUp = async (email, password, firstname, lastname) => {
    const response = await signUpUser(email, password, firstname, lastname);
    setUser(response);
    history.goBack();
  };

  const updateUserState = (formState) => {
    setUser((prev) => {
      return { ...prev, ...formState };
    });
  };

  const signOut = async () => {
    setUser({ email: null });
    localStorage.removeItem('user');
    await signOutUser();
  };
  const userSignedIn = user.email;
  return { signIn, signUp, signOut, userSignedIn, user, updateUserState };
};

export { useAuth };
