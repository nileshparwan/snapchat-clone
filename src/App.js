import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import WebcamCapture from './WebcamCapture';
import Preview from './Preview';
import "./App.css"; 
import Chats from './Chats';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="app__body">
          <Switch>
            <Route exact path="/test">
              <h1>Yo WHATS UP</h1>
            </Route>

            <Route exact path="/chats">
            <Chats />
            </Route>

            <Route exact path="/">
              <WebcamCapture />
            </Route>

            <Route exact path="/preview">
              <Preview />
            </Route>
          </Switch>
        </div>
      </Router>


    </div>
  );
}

export default App;
