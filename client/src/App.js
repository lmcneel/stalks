import React, {Component} from 'react';
<<<<<<< HEAD
import logo from './logo.svg';
import './App.css';
import Inventory from './components/userFoodAndToys';
=======
// import CollapseRow from './components/CollapseRow/index';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Petfolio from './pages/Petfolio';
import Trading from './pages/Trading';
>>>>>>> 5f288423c6c6b4ebc7a01e11700c231b1d95dc96

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
<<<<<<< HEAD
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Inventory />
      </div>
=======

      <Router>
        <div>
          <Switch>
            <Route exact path="/petfolio" component={Petfolio} />
            <Route exact path='/trading' component={Trading} />
          </Switch>
        </div>
      </Router>
>>>>>>> 5f288423c6c6b4ebc7a01e11700c231b1d95dc96
    );
  }
}
export default App;

