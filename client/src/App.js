import React, {Component} from 'react';
// import CollapseRow from './components/CollapseRow/index';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Petfolio from './components/pages/Petfolio';
import Trading from './components/pages/Trading';

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
        <div>
          <Switch>
            <Route exact path="/petfolio" component={Petfolio} />
            <Route exact path='/trading' component={Trading} />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;

