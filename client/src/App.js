import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Petfolio from './pages/Petfolio';
import Test from './pages/Test';

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/petfolio" component={Petfolio} />
        <Route exact path="/test" component={Test} />
      </Switch>
    </div>
  </Router>
);

export default App;
