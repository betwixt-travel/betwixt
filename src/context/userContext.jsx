import { createContext, useEffect, useState } from 'react';
import { getUser } from '../services/user';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const defaultValue = { email: null };
  const [user, setUser] = useState(defaultValue);
  const value = { user, setUser };

  useEffect(() => {
    if (user !== defaultValue) {
      console.log('user', user !== defaultValue);
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUser(user);
    }
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
