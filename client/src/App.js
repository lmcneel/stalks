<<<<<<< HEAD

import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Trading from './pages/Trading';
import Transaction from './pages/Transaction';
=======
// import React from 'react';
// import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
// import './App.css';
// import Trading from './pages/Trading';
>>>>>>> a21340ea1f848b58ce27e0f2d18a979afb39de1e

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path='/trading' component={Trading} />
        <Route exact path='/trade' component={Transaction} />
      </Switch>
    </div>
  </Router>
);

<<<<<<< HEAD
export default App;
=======
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Trading from './pages/Trading';


// export default App;
>>>>>>> a21340ea1f848b58ce27e0f2d18a979afb39de1e

// import React, {Component} from 'react';
// import logo from './logo.svg';
// import './App.css';

// /**
//  * Class App
//  */
// class App extends Component {
//   /**
//    * Render function for App Component
//    * @return {JSX}
//    */
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }
// export default App;
