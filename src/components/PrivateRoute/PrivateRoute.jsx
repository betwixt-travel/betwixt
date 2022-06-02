import { Redirect, Route } from 'react-router-dom';
import UserProvider from '../../context/UserContext/UserContext';
import useAuth from '../../hooks/user';

export default function PrivateRoute({ children, ...rest }) {
  const { user } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
