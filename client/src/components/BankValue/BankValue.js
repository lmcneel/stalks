import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPiggyBank} from '@fortawesome/fontawesome-free-solid';
/**
 * @class BankValue
 */
class BankValue extends Component {
  /**
 * Constructor function for setting state
 * @param {*} props
 */
  constructor(props) {
    super(props);
    this.state = {
      bankValue: 3500,
    };
  }
  /**
   * @return {*} Container
   */
  render() {
    return (
      <div>
        <FontAwesomeIcon icon={faPiggyBank} className="pad"/>
        ${this.state.bankValue}
      </div>
  );
 }
};

export default BankValue;
