import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBriefcase} from '@fortawesome/fontawesome-free-solid';
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
        <div>
          <FontAwesomeIcon icon={faBriefcase} />
          ${this.state.petfolioValue}
        </div>
    );
  }
};

export default PetfolioValue;
