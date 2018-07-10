import React, {Component} from 'react';
import DocsList from './components/DocsList/DocsList';
import HelpLanding from './components/HelpLanding/HelpLanding';
// import CollapseRow from './components/CollapseRow/index';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Petfolio from './pages/Petfolio';
import Trading from './pages/Trading';

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
            <Route exact path='/help' component={HelpLanding} />
            <Route exact path='/docs' component={DocsList} />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;

