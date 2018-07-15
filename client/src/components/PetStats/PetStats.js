import React from 'react';
import {Container, Row, Col} from 'reactstrap';
import PetStatusBars from '../PetStats/PetStatusBars';
import PetPic from '../PetStats/PetPic';
import PetName from '../PetStats/PetName';
import API from '../../utils/API';

/**
 * @class
 */
class PetStats extends React.Component {
  constructor(props) {
    super(props);
    this.petAnimal = this.petAnimal.bind(this);
    this.state = {};
  }
  
  componentDidMount() {
    API.getPetInfo(1).then((res) => {
      console.log(res);
      this.setState( {
        name: res.data.petName,
        pic: res.data.urlImage,
        lastFed: res.data.lastFed,
        lastPet: res.data.lastPet,
        lastFondness: res.data.lastFondness,
        petId: res.data.id,
      });
      this.getOverallHealth();
    })
  }

  getOverallHealth() {
    this.getFondness();
    this.getHappiness();
    this.getHunger();
    this.setState({overallHealth: (this.state.fondness + this.state.happiness + this.state.hungerLeft) / 3});
  }

  getFondness() {
    // Get last time animal was pet and the amount of fondness at that time
    // Subtract the appropriate amount based on the draining time
    // When the pet button is clicked add the appropriate amount of fondness
    // Write the time it was pet and the new amount of fondness
    // Start a timer for the cooldown on the pet button
    const timeSincePet = Date.now() - new Date(this.state.lastPet);
    const fondnessDrained = (timeSincePet / 172800000) * 100;
    let fondness = this.state.lastFondness - fondnessDrained;
    this.setState({fondness: fondness});
  }

  getHappiness() {
    this.state.happiness = 75;
  }

  getHunger() {
    // Drain hunger based on a time interval.
    // The drain will take effect upon login.
    // To calculate the amount of drain we will use the last time they logged in as-
    // -a time stamp and subtract that from their current login then drain the hunger appropriately.
    // 24 hours until your pet food reaches 0
    // (Last login timestamp) - (Current login timestamp) = (Hunger drain)
    const now = Date.now();
    const timeSinceFed = now - new Date(this.state.lastFed);
    const hungerLeft = Math.max(((1 - (timeSinceFed / 86400000)) * 100), 0);
    this.setState({hungerLeft: hungerLeft});
  }

  feed() {
    // Feeding your pet is how you will increase the hunger bar (meaning it will not need food for a while)
    // You can buy the food using in game currency in the shop, you can only own so much food at a time.
  }

  petAnimal() {
    this.setState({fondness: this.state.fondness + 20, 
    lastPet: Date.now(),
    lastFondness: this.state.fondness + 20,
    }, () => {
      API.updatePetInfo(this.state)
    });
    console.log(this.state.lastPet)
  }

  render() {
    if(this.state.name)
    return (
      <div>
        <Container>
          <Row>

            <Col>
            <div>
              <PetPic pic={this.state.pic}/>
            </div>
            </Col>

            <Col>
            <div>
              <PetName name={this.state.name}/>
            </div>
            <div>
              <PetStatusBars
              hunger={this.state.hungerLeft}
              overallHealth={this.state.overallHealth}
              fondness={this.state.fondness}
              happiness={this.state.happiness}
              petHandler={this.petAnimal}
              />
            </div>
            </Col>

          </Row>
        </Container>
      </div>
    );
  return false;
  }
}

export {PetStats};
