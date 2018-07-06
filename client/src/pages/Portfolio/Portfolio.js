import React, { Component } from 'react';
import { PetName, PetPic, PetStats, PetWrapper } from '../../components/PetStats';
import './Portfolio.css';


class Portfolio extends Component {
    state = {
      petName : 'Wolf',
      petPic : './defaultPetPic.png',  
      petStats: [85, 90, 50, 70]
    };
   
    render() {
      return (

       <div className="main">
       <h2>Portfolio Page</h2>

       <PetWrapper>

        <PetPic>
          {this.state.petPic}
        </PetPic>   

        <div className="petname">
          <PetName>
            {this.state.petName}
          </PetName>
        </div>

        <div className="statusbars">
        <PetStats 
            petStat="Overall Health"
            petStatColor="success"
            petStatValue={this.state.petStats[0]}
        />
        <PetStats 
            petStat="Hunger"
            petStatColor="danger"
            petStatValue={this.state.petStats[3]}
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
        
        </div>
    
        </PetWrapper>
    
    </div>   
    
    );
  }
};

  export default Portfolio;