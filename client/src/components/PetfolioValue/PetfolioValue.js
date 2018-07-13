import React, {Component} from 'react';
/**
 * @class PetfolioValue
 */
class PetfolioValue extends Component {
  /**
 * Constructor function for setting state
 * @param {*} props
 */
  constructor(props) {
    super(props);
    this.state = {
      petfolioValue: 2001,
    };
  }
  /**
   * @return {*} Container
   */
  render() {
    return (
        <div>
          $ {this.state.petfolioValue}
        </div>
    );
  }
};

export default PetfolioValue;
