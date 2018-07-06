import React, { Component } from 'react';
import PetStats from '../../components/PetStats';
import './Portfolio.css';

class Portfolio extends Component {
    state = {
      petStats: [85, 90, 50, 70]
    };
  

   
    render() {
    
      return (

       <div className="main">
       <h2>Portfolio Page</h2>
        <div className="statusbars">
        <PetStats 
            petStat="Overall Health"
            petStatColor="success"
            petStatValue={this.state.petStats[0]}
        />
        <PetStats 
            petStat="Happiness"
            petStatColor="info"
            petStatValue={this.state.petStats[1]}
        />
        <PetStats 
            petStat="Fondness"
            petStatColor="warning"
            petStatValue={this.state.petStats[2]}
        /> 
        <PetStats 
            petStat="Hunger"
            petStatColor="danger"
            petStatValue={this.state.petStats[3]}
        />
        </div>
        </div>    
      );
  }
}
  export default Portfolio;