
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Trading from './pages/Trading';

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path='/trading' component={Trading} />
      </Switch>
    </div>
  </Router>
);

export default App;
