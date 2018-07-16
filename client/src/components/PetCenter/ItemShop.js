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

    buyItem = (id) => {
        
        API.createAccessory({
           name: this.state.results[id].itemName,
           category: this.state.results[id].category,
           imaageURL: this.state.results[id].imageURL,
           quantity: 1,
           PetId: 12  
        })
        .then(res => console.log(res));   
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
                                  <Card name={result.itemName}  buyingItem={() => this.buyItem(index)} image={result.imageURL} buttonName={'buy'} style={{'margin':'50px'}}  />
                                 
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
