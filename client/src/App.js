import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import CollapseRow from './components/CollapseRow/index';
import SigninForm from './components/SigninForm';
import SignupForm from './components/SignupForm';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faFacebookF, faGoogle} from '@fortawesome/fontawesome-free-brands';
import {faAt, faKey} from '@fortawesome/fontawesome-free-solid';

library.add(faFacebookF|faGoogle|faAt|faKey);

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
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>Welcome to React</h1>
        </header>
          <Switch>
            <Route exact path='/login' component={SigninForm} />
            <Route exact path='/signup' component={SignupForm} />
          </Switch>
        <CollapseRow />
      </div>
      </Router>
    );
  };
}
export default App;

