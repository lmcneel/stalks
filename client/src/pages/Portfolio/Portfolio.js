import React, { Component } from 'react';
import { Container, Row, Col} from 'reactstrap';
import { PetName, PetPic, PetStats, PetWrapper } from '../../components/PetStats';
<<<<<<< Updated upstream
import BankValue from '../../components/BankValue';
import PortfolioValue from '../../components/PortfolioValue';
=======
import { PieChart } from '../../components/PieChart';
>>>>>>> Stashed changes
import './Portfolio.css';
 

class Portfolio extends Component {
    state = {
      petName : 'Wolf',
      petPic : './defaultPetPic.png',  
      petStats: [85, 90, 50, 70],
      portfolioValue: '$1000',
      bankValue: '$2000'
    };
   
    render() {
      return (

<<<<<<< Updated upstream
        <Container fluid>
          <Row>
            <Col size="md-3">
            Side Bar
            </Col>
            <Col size="md-3">
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
            </Col>

            <Col size="md-6">
              <Row>
                <Col>
                  <PortfolioValue portfolioValue={this.state.portfolioValue}/>
                </Col>
                <Col>
                  <BankValue bankValue = {this.state.bankValue}/>
                </Col>
              </Row>
              <Row>
              </Row>
            </Col>
          </Row>

    </Container>   
=======
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
    

      <PieChart>
    </div>   
>>>>>>> Stashed changes
    
    );
  }
};

  export default Portfolio;