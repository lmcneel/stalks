import React, { Component } from "react";
import Nav from './Nav'
import {Button, Container, Row, Col } from 'reactstrap';
import Card from './Card'
import API from '../../utils/API'


// Saved Component used when saved tab is clicked. shows the saved components
class ItemShop extends Component {
    state = {
        results: []
    };

    displayAccessories = ()=> {
      API.getStoreAccessories()
      .then(res => this.setState({ results: res.data }))
    
    }
    displayFoodAndToys = ()=> {
      API.displayStoreFoodAndToys()
      .then(res => this.setState({ results: res.data }))
    }

    componentDidMount() {
        this.displayAccessories()
    };




    render() {
        return (
          
          <div>
          <Container>
          <Nav/>
          <Button onClick={this.displayFoodAndToys} style={{'margin-right': '2px'}}> Food and Toys</Button>
          <Button onClick={this.displayAccessories}style={{'margin-right': '2px'}}> Accessories </Button>
          <Col></Col>
          <Container>
          <Row>
                    {(this.state.results.length) ? (
                        <div style={{'display': 'contents'}}>
                            {this.state.results.map((result, index) => {
                                return (
                                  <Card name={result.itemName} image={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStE88QZWx1eLEsnCSjvXBQHjxiXJ1nY0PlNkf7H6twi9ru_NBU3g'} buttonName={'buy'} style={{'margin':'50px'}}/>
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
