import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import TopPage from 'src/container/TopPage';
import SimpleSocketPage from 'src/container/SimpleSocketPage';
import RoomListPage from 'src/container/RoomListPage';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/room/list">
            <RoomListPage />
          </Route>
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
