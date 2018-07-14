import React, { Component } from "react";

import Nav from './Nav'
import {Button, Container, Row, Col } from 'reactstrap';
import Card from './Card'
import API from '../../utils/API'


// Saved Component used when saved tab is clicked. shows the saved components
class MainApp extends Component {
    state = {
        results: []
    };



    displayAccessories = ()=> {
      API.getPurchasedAccessories()
      .then(res => this.setState({results: res.data}))
    
    }
    displayFoodAndToys = ()=> {
        API.getPurchasedAccessories()
        .then(res => this.setState({results: res.data}))
    }
    displayEnviornments = ()=> {
        API.getPurchasedAccessories()
        .then(res => this.setState({results: res.data}))
    }



    render() {
        return (
          
          <div>
          <Container>
          <Nav/>
          
          <Button onClick={this.displayFoodAndToys} style={{'margin-right': '2px'}}> Food and Toys</Button>
          <Button onClick={this.displayAccessories}style={{'margin-right': '2px'}}> Accessories </Button>
          <Button onClick={this.displayEnviornments}style={{'margin-right': '2px'}}> Enviornment </Button>
          <Col></Col>
          <Container>
          <Row>
                    {(this.state.results.length) ? (
                        <div style={{'display': 'flex'}}>
                            {this.state.results.map((result, index) => {
                                return (
                                  <Card name={result.Petname} image={result.urlImage} buttonName={'Use'} style={{'margin':'50px'}}/>
                                );
                            })}
                        </div>
                       
                    ) : (<h3> There are no saved Items </h3>)}
            </Row>
            </Container>
            </Container>
            </div>
        )
    }

}


export default MainApp;