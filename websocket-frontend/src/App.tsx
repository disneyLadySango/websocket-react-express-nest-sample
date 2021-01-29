import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import TopPage from './TopPage'
import SimpleSocketPage from './SimpleScoketPage'

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/unit">
            <SimpleSocketPage />
          </Route>
          <Route path="/">
            <TopPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
