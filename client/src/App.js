import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import SignUp from './components/SignUp/SignUp';
import LogIn from './components/Login/LogIn';
import Profile from './components/Profile/Profile';
import Sell from './components/Sell/Sell';
import dotenvConfig from 'dotenv/config';


class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={LogIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/profile" component= {Profile} />
            <Route path="/sell" component={Sell} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
