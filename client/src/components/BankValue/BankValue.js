import React, {Component} from 'react';

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
      <span>
        ${this.state.bankValue}
      </span>
  );
 }
};

export default BankValue;
