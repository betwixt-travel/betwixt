import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import {
  signInUser,
  signUpUser,
  createProfile,
  fetchUserData,
  signOutUser,
} from '../services/user';

const useAuth = () => {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error('user context must be used with a provider');
  const { user, setUser } = context;
  const history = useHistory();

  const signIn = async (email, password) => {
    await signInUser(email, password);
    const profileData = await fetchUserData();
    setUser({ email, ...profileData });
    history.push('/');
  };

  const signUp = async (email, password, firstname, lastname) => {
    const response = await signUpUser(email, password);
    await createProfile(response.id, firstname, lastname);
    const profileData = await fetchUserData();
    setUser({ email, ...profileData });

    history.push('/');
  };

  const signOut = async () => {
    setUser({ email: null });
    await signOutUser();
  };
  const userSignedIn = user.email;

  return { signIn, signUp, signOut, userSignedIn, user };
};

export { useAuth };
