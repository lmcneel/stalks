import React, {Component} from 'react';
import './App.css';
import Inventory from './components/userFoodAndToys';
// import CollapseRow from './components/CollapseRow/index';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Petfolio from './pages/Petfolio';
import Trading from './pages/Trading';
import Inventory from './components/userTabs';

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
      <div>
      <div>
        <Inventory />
      </div>

      <Router>
        <div>
          <Switch>
            <Route exact path="/petfolio" component={Petfolio} />
            <Route exact path='/trading' component={Trading} />
          </Switch>
        </div>
      </Router>
      </div>
    );
  }
}
export default App;

