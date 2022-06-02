import { Route, Switch } from 'react-router-dom';
import Home from './views/Home/Home';
import Auth from './views/Auth/Auth';
import Profile from './views/Profile';
import Results from './views/Results';
import ResultsDetail from './views/ResultsDetail';
import Header from './components/Header/Header';
import { TravelProvider } from './context/TravelContext';
import styles from './App.css';
import { Toaster } from 'react-hot-toast';
import AboutUs from './views/AboutUs/AboutUs';
import { useAuth } from './hooks/useUser';
import { Redirect } from 'react-router-dom';

export default function App() {
  const { user } = useAuth();
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <TravelProvider>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            {user.email ? <Redirect to={'/'} /> : <Auth />}
          </Route>
          <PrivateRoute path="/profile">
            <Profile />
          </PrivateRoute>
          <Route exact path="/city">
            <ResultsDetail />
          </Route>
          <Route path="/results">
            <Results />
          </Route>
          <Route path="/about">
            <AboutUs />
          </Route>
        </Switch>
      </TravelProvider>
    </>
  );
}
