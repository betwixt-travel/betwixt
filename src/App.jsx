import { Route, Switch } from "react-router-dom";
import Home from "./views/Home";
import Auth from "./views/Auth";
import Profile from "./views/Profile";
import Results from "./views/Results";
import ResultsDetail from "./views/ResultsDetail";

export default function App() {
  
  return (
    <>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/auth'>
          <Auth />
        </Route>
        <Route path='/profile'>
          <Profile />
        </Route>
        <Route path='/results'>
          <Results />
        </Route>
        <Route path='/results/:city'>
          <ResultsDetail />
        </Route>
      </Switch>
    </>
  );
}
