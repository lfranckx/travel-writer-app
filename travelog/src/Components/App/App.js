/*eslint semi: ["error", "always"]*/
import React, { Component } from 'react';
import { Switch, withRouter } from 'react-router-dom';
import './App.css';

import Header from '../Header/Header';
import ArticlePage from '../../Routes/ArticlePage/ArticlePage';
import AuthorPage from '../../Routes/AuthorPage/AuthorPage';
import BookmarksPage from '../../Routes/BookmarksPage/BookmarksPage';
import LoginPage from '../../Routes/LoginPage/LoginPage';
import MainPage from '../../Routes/MainPage/MainPage';
import PostArticlePage from '../../Routes/PostArticlePage/PostArticlePage';
import ProfilePage from '../../Routes/ProfilePage/ProfilePage';
import ResultsPage from '../../Routes/ResultsPage/ResultsPage';
import SignUpPage from '../../Routes/SignUpPage/SignUpPage';

import TokenService from '../../Services/token-service';
import AuthApiService from '../../Services/auth-api-service';
import IdleService from '../../Services/idle-service';

import PrivateRoute from '../../Utils/PrivateRoute';
import PublicRoute from '../../Utils/PublicRoute';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      error: false,
    };
  }

  static getDerivedStateFromError(error) {
    return { error: true };
  }

  componentDidMount() {

    localStorage.clear();
    /*
      set the function (callback) to call when a user goes idle
      we'll set this to logout a user when they're idle
    */
    IdleService.setIdleCallback(this.logoutFromIdle);

    /* if a user is logged in */
    if (TokenService.hasAuthToken()) {
      /*
        tell the idle service to register event listeners
        the event listeners are fired when a user does something, e.g. move their mouse
        if the user doesn't trigger one of these event listeners,
        the idleCallback (logout) will be invoked
      */
      IdleService.regiserIdleTimerResets();

      /*
        Tell the token service to read the JWT, looking at the exp value
        and queue a timeout just before the token expires
      */
      TokenService.queueCallbackBeforeExpiry(() => {
        /* the timoue will call this callback just before the token expires */
        AuthApiService.postRefreshToken();
      });
    }

  }

  componentWillUnmount() {
    /*
      when the app unmounts,
      stop the event listeners that auto logout (clear the token from storage)
    */
    IdleService.unRegisterIdleResets();
    /*
      and remove the refresh endpoint request
    */
    TokenService.clearCallbackBeforeExpiry();
  }

  stringifyArray(array) {
    let copiedObj = JSON.parse(JSON.stringify(array));
    return copiedObj;
  }

  logoutFromIdle = () => {
    /* remove the token from localStorage */
    TokenService.clearAuthToken();
    /* remove any queued calls to the refresh endpoint */
    TokenService.clearCallbackBeforeExpiry();
    /* remove the timeouts that auto logout when idle */
    IdleService.unRegisterIdleResets();
    /*
      react won't know the token has been removed from local storage,
      so we need to tell React to rerender
    */
    this.forceUpdate();
  }

  render() {
    return (
      <>
        <Header />
        <main>
          {this.state.error && <p className="error">There was an error.</p>}
          <Switch>
            <PublicRoute 
              exact path="/"
              compnent={MainPage}
            />
            <PublicRoute 
              path="/login"
              compnent={LoginPage}
            />
            <PublicRoute 
              path="/register"
              component={SignUpPage}
            />
            <PublicRoute 
              path="/results"
              compnen={ResultsPage}
            />
            <PublicRoute 
              path="/article"
              component={ArticlePage}
            />
            <PublicRoute 
              path="/author"
              component={AuthorPage}
            />
            <PrivateRoute 
              path="/bookmarks"
              component={BookmarksPage}
            />
            <PrivateRoute 
              path="/post"
              component={PostArticlePage}
            />
            <PrivateRoute
              path="/profile"
              component={ProfilePage}
            />
          </Switch>
        </main>
      </>
    );
  }
}

export default withRouter(App);