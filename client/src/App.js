import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Portfolio from "./pages/Portfolio";



const App = () => (
  <Router>
    <div>
  
      <Switch>
        
        <Route exact path="/portfolio" component={Portfolio} />
        
      </Switch>
    </div>
  </Router>
);

export default App;
