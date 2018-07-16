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
      petfolioValue: 500,
    };
  }
  /**
   * @return {*} Container
   */
  render() {
    return (
        <span>
          ${this.state.petfolioValue}
        </span>
    );
  }
};

export default PetfolioValue;
