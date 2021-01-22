import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import WebcamCapture from './WebcamCapture';
import Preview from './Preview';
import "./App.css";
import Chats from './Chats';
import ChatView from './ChatView';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/appSlice';
import Login from './Login';
import { auth } from './firebase';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(
      (authUser) => {
        if (authUser) {
          dispatch(
            login({
              username: authUser.displayName,
              profilePic: authUser.photoURL,
              id: authUser.uid
            })
          );
        } else {
          dispatch(
            logout()
          );
        }
      }
    );
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        {
          !user ? (
            <Login />
          ) : (
              <>
                <img className="app__logo" src="snapchat.png" alt="" />
                <div className="app__body">
                  <div className="app__bodyBackground">
                    <Switch>
                      <Route exact path="/test">
                        <h1>Yo WHATS UP</h1>
                      </Route>

                      <Route exact path="/chats">
                        <Chats />
                      </Route>

                      <Route exact path="/chats/view">
                        <ChatView />
                      </Route>

                      <Route exact path="/">
                        <WebcamCapture />
                      </Route>

                      <Route exact path="/preview">
                        <Preview />
                      </Route>
                    </Switch>
                  </div>
                </div>
              </>
            )
        }

      </Router>


    </div>
  );
}

export default App;
