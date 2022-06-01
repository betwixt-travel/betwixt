import { createContext, useEffect, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const defaultValue = { email: null };
  const [user, setUser] = useState(defaultValue);

  useEffect(() => {
    if (user !== defaultValue) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUser(user);
    }
  }, []);

  const value = { user, setUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
