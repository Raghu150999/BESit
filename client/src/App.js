import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import SignUp from './components/SignUp';
import NavBar from './components/NavBar';
import LogIn from './components/LogIn';
import Profile from './components/Profile';
import HomeNav from './components/HomeNav';


class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={LogIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/profile" component= {Profile} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
