import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import SignUp from './components/SignUp';
import NavBar from './components/NavBar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={SignUp} />
            {/* <Route path="/public" component= {Public} /> */}
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
