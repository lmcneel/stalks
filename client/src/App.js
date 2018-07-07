import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Container from "./components/Container";
import Images from "./components/Images";
import Footer from "./components/Footer";
import Title from "./components/Title";
// import LinkButton from "./components/LinkButton";
import data from "./data.json";

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
      <Footer />
      </div>
    );
  }
}

export default App;
