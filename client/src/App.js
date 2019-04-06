import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import SignUp from './components/SignUp/SignUp';
import LogIn from './components/Login/LogIn';
import Profile from './components/Profile/Profile';
import Sell from './components/Sell/Sell';
import User from './components/User/User';
import Requirements from './components/Requirements/Requirements'
import { } from 'dotenv/config';
import axios from 'axios';
import Buy from './components/Buy/Buy';
import Home from './components/Home/Home';


// Setting up baseURL for axios api requests change this to process.env.REACT_APP_API_URI_LOCAL for local testing and process.env.REACT_APP_API_URI for cloud testing
axios.defaults.baseURL = process.env.REACT_APP_API_URI_LOCAL;

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={LogIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/profile" component= {Profile} />
            <Route path="/sell" component={Sell} />
            <Route path="/buy" component={Buy} />
            <Route path="/user" component={User}/>
            <Route path="/requirements" component={Requirements} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
