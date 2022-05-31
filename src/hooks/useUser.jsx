import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { signInUser, signUpUser, updateProfileInfo } from '../services/user';

const useAuth = () => {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error('user context must be used with a provider');
  const { user, setUser } = context;
  const history = useHistory();

  const signIn = async (email, password) => {
    const response = await signInUser(email, password);
    console.log('response sign in', response);
    setUser(response);
    history.push('/');
  };

  const signUp = async (email, password, firstname, lastname) => {
    const response = await signUpUser(email, password);
    console.log('response sign up', response);

    const responseupdate = await updateProfileInfo(
      response.id,
      firstname,
      lastname
    );
    console.log('responseupdate', responseupdate);
    setUser(response);
    history.push('/');
  };

  return { signIn, signUp };
};

export { useAuth };
