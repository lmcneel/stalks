import React, {Component} from 'react';
// import CollapseRow from './components/CollapseRow/index';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Petfolio from './pages/Petfolio';
import Test from './pages/Test';
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
            <Route exact path="/test" component={Test} />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;

