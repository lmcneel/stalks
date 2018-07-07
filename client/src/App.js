// import React from 'react';
// import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
// import './App.css';
// import Trading from './pages/Trading';

// const App = () => (
//   <Router>
//     <div>
//       <Switch>
//         <Route exact path='/trading' component={Trading} />
//       </Switch>
//     </div>
//   </Router>
// );

import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Trading from './pages/Trading';


// export default App;

import React, {Component} from 'react';
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
      <div className="App">
        <CollapseRow />
      </div>
    );
  }
}
export default App;
