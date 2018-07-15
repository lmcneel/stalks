import React, { Component } from "react";
import Nav from './Nav'
import {Button, Container, Row, Col } from 'reactstrap';
import Card from './Card'
import API from '../../utils/API'


// Saved Component used when saved tab is clicked. shows the saved components
class ItemShop extends Component {
    state = {
        results: [{name: 'dog', image: 'data:image/jpeg;base64,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' } ]
    };



    displayAccessories = ()=> {
      let answer=API.getStoreAccessories()
      this.setState({ results: answer })
    
    }
    displayFoodAndToys = ()=> {
      let answer=API.displayStoreFoodAndToys()
      this.setState({ results: answer })
    }
    displayEnviornments = ()=> {
      let answer=API.displayStoreEnviornments()
      this.setState({ results: answer })
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
                        <div style={{'display': 'contents'}}>
                            {this.state.results.map((result, index) => {
                                return (
                                  <Card name={result.name} image={result.image} buttonName={'buy'} style={{'margin':'50px'}}/>
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


export default ItemShop;