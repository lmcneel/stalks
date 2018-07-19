import React, { Component } from "react";
import Nav from './Nav'
import {Button, Container, Row, Col } from 'reactstrap';
import Card from './Card';
import API from '../../utils/API';
import BlueCollar from '../../assets/images/BlueCollar.svg';
import RedCollar from '../../assets/images/RedCollar.svg';
import Bowtie from '../../assets/images/Bowtie.svg';
import Kibble from '../../assets/images/Kibble.svg';
import Rope from '../../assets/images/Rope.png';
import Ball from '../../assets/images/Ball.svg';
import BowTie from '../../assets/images/Bowtie.svg'




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
           imageURL: "",
           quantity: 1,
           PetId: 12  
        })
        .then(res => console.log(res));   
    }

    imageName = (item) => { 
        switch (item){
        case('ball'): return Ball
        break;
        case('rope'): return Rope
        break;
        case('kibble'): return Kibble
        break;
        case('treat'): return Kibble
        break;
        case('red collar'): return RedCollar
        break;
        case('blue collar'): return BlueCollar
        break;
        case('bow tie'): return BowTie
        break;
        default: return BlueCollar
    }}

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
                                  <Card name={result.itemName}  buyingItem={() => this.buyItem(index)} image={this.imageName(result.itemName)} buttonName={'buy'} style={{'margin':'50px'}}  />
                                 
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
