import { Route, Switch, Redirect } from 'react-router-dom';
import { useAuth } from './hooks/useUser';
import { TravelProvider } from './context/TravelContext';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Home from './views/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Auth from './views/Auth/Auth';
import Profile from './views/Profile';
import Results from './views/Results';
import ResultsDetail from './views/ResultsDetail';
import AboutUs from './views/AboutUs/AboutUs';
import styles from './App.css';
import { Toaster } from 'react-hot-toast';

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
        <Footer />
      </TravelProvider>
    </>
  );
}
