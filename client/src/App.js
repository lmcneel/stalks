import React, {Component} from 'react';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import CollapseRow from './components/CollapseRow/index';


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
        <CollapseRow />
      </div>
      </Router>
    );
  }
}
export default App;
