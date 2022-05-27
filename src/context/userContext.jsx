import { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const value = {user, setUser};

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }