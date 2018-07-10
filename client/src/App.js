import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Container from "./components/Container";
import Images from "./components/Images";


// import LinkButton from "./components/LinkButton";
import data from "./data.json";
import React, {Component} from 'react';
// import CollapseRow from './components/CollapseRow/index';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Petfolio from './pages/Petfolio';
import Trading from './pages/Trading';

class App extends Component {
  state = {
    data : data,
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
         Meet the Team!
        </p>

        <Container >
      <div className="wrapper">
      {this.state.data.map(data=>(
        <Images
        // imgClick={this.imgClick}
        id={data.id}
        key={data.id}
        img={data.image}
        name={data.name}
        title={data.title}
        portfolio={data.portfolio}
        />
        
      ))}
      
      </div>
      </Container>
      

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

