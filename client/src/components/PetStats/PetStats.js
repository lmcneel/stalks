import React from 'react';
import {Container, Row, Col} from 'reactstrap';
import PetStatusBars from '../PetStats/PetStatusBars';
import PetPic from '../PetStats/PetPic';
import PetName from '../PetStats/PetName';
import wolfy from '../pages/defaultPetPic.png';

/**
 * @class
 */
class PetStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Wolfy',
      pic: wolfy,
      lastFed: '2018-07-13 12:00:00',
    };
  }

  componentDidMount() {
    this.getOverallHealth();
  }

  getOverallHealth() {
    this.getFondness();
    this.getHappiness();
    this.getHunger();
    this.state.overallHealth = (this.state.fondness + this.state.happiness + this.state.hungerLeft) / 3;
  }

  getFondness() {
    // Get last time animal was pet and the amount of fondness at that time
    // Subtract the appropriate amount based on the draining time
    // When the pet button is clicked add the appropriate amount of fondness
    // Write the time it was pet and the new amount of fondness
    // Start a timer for the cooldown on the pet button
    this.state.fondness = 80;
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
    this.state.hungerLeft = hungerLeft;
  }

  feed() {
    // Feeding your pet is how you will increase the hunger bar (meaning it will not need food for a while)
    // You can buy the food using in game currency in the shop, you can only own so much food at a time.
  }

  render() {
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
              happiness={this.state.happiness}/>
            </div>
            </Col>

          </Row>
        </Container>
      </div>
    );
  }
}

export {PetStats};
