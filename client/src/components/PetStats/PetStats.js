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
    this.feed = this.feed.bind(this);
    this.state = {};
  }

  componentDidMount() {
    API.getPetInfo(1).then((res) => {
      console.log(res);
      res.data.Accessories.forEach((accessory) => {
        if (accessory.equipped) {
          this.setState({equippedAccessory: accessory});
        }
      });
      this.setState( {
        name: res.data.petName,
        pic: res.data.urlImage,
        lastFed: res.data.lastFed,
        lastPet: res.data.lastPet,
        lastFondness: res.data.lastFondness,
        petId: res.data.id,
        Accessories: res.data.Accessories,
      });
      this.getOverallHealth();
    });
  }

  getOverallHealth() {
    this.getFondness();
    this.getHappiness();
    this.getHunger();
    this.setState({overallHealth: (this.state.fondness + this.state.happiness + this.state.hunger) / 3});
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
    if (this.state.equippedAccessory && this.state.equippedAccessory.name === 'red collar') {
      fondness += 20;
    }
    fondness = Math.min(fondness, 100);
    fondness = Math.max(fondness, 0);
    this.setState({fondness: fondness});
  }

  // TODO Calculate Happiness blocked by ROI API.
  getHappiness() {
    // Dummy value
    let happiness = 75;
    if (this.state.equippedAccessory && this.state.equippedAccessory.name === 'blue collar') {
      happiness += 20;
    }
    happiness = Math.min(happiness, 100);
    happiness = Math.max(happiness, 0);
    this.setState({happiness: happiness});
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
    const hunger = Math.max(((1 - (timeSinceFed / 86400000)) * 100), 0);
    this.setState({hunger: hunger});
  }

  // TODO: Decrease food inventory by one. Blocker-User login/Inventory.
  feed() {
    // Feeding your pet is how you will increase the hunger bar (meaning it will not need food for a while)
    // You can buy the food using in game currency in the shop, you can only own so much food at a time.
    let newState = {hunger: 100, lastFed: Date.now()};
    if (this.state.equippedAccessory && this.state.equippedAccessory.name === 'bow tie') {
      newState.lastFondness = this.state.lastFondness + 20;
    }
    this.setState(newState,
    () => {
      API.updatePetInfo(this.state);
    });
  }

  petAnimal() {
    this.setState({fondness: this.state.fondness + 20,
    lastPet: Date.now(),
    lastFondness: this.state.fondness + 20,
    }, () => {
      API.updatePetInfo(this.state);
    });
    console.log(this.state.lastPet);
  }

  render() {
    let petButton, feedButton;
    feedButton = <button className='feedButton' onClick={this.feed}>Feed</button>;
    if (Date.now() - new Date(this.state.lastPet) < 10800000) {
      petButton = <button className='petButton' onClick={this.petAnimal} disabled>Pet</button>;
    } else {
      petButton = <button className='petButton' onClick={this.petAnimal}>Pet</button>;
    }
    if (this.state.name) {
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
              hunger={this.state.hunger}
              overallHealth={this.state.overallHealth}
              fondness={this.state.fondness}
              happiness={this.state.happiness}
              petButton={petButton}
              feedButton={feedButton}
              />
            </div>
            </Col>

          </Row>
        </Container>
      </div>
    );
}
  return false;
  }
}

export {PetStats};
