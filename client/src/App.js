import React, {Component} from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';

/**
 * Class App
 */
class App extends Component {
  /**
   * Render function for App Component
   * @return {JSX}
   */
  render() {
    return (
      <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
          <Switch>
            <Route exact path="/login" component={SigninForm} />
            <Route exact path="/signup" component={SignupForm} />
            <Route component={NoMatch} />
          </Switch>
      </div>
      </Router>
    );
  }
}
export default App;
