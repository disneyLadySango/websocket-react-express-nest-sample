import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import TopPage from 'src/container/TopPage';
import SimpleSocketPage from 'src/container/SimpleSocketPage';
import RoomListPage from 'src/container/RoomListPage';
import RoomPage from 'src/container/RoomPage';

const StyledPageWrapper = styled.div`
  width: 100%;
`;
function App() {
  return (
    <Router>
      <StyledPageWrapper>
        <Switch>
          <Route path="/room/list">
            <RoomListPage />
          </Route>
          <Route path="/room/:uid">
            <RoomPage />
          </Route>
          <Route path="/unit">
            <SimpleSocketPage />
          </Route>
          <Route path="/">
            <TopPage />
          </Route>
        </Switch>
      </StyledPageWrapper>
    </Router>
  );
}

export default App;
