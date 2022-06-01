import { Route, Switch } from 'react-router-dom';
import Home from './views/Home';
import Auth from './views/Auth/Auth';
import Profile from './views/Profile';
import Results from './views/Results';
import ResultsDetail from './views/ResultsDetail';
import Header from './components/Header/Header';
import { TravelProvider } from './context/TravelContext';
import styles from './App.css'

export default function App() {
  return (
    <>
      <TravelProvider>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/auth">
            <Auth />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route exact path="/results/:city">
            <ResultsDetail />
          </Route>
          <Route path="/results">
            <Results />
          </Route>
        </Switch>
      </TravelProvider>
    </>
  );
}
