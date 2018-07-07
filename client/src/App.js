
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

// export default App;

import React, {Component} from 'react';
import logo from './logo.svg';
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
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}
export default App;
