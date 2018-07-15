import React, {Component} from 'react';
import TradeFunctions from '../../utils/TradeFunctions';
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
   * Setting state for petfolioValue
   */
  // componentDidMount() {
  //   TradeFunctions.myStocksValue().then(((r) => {
  //     console.log(r);
  //   }));
  // };

  /**
   * @return {*} Container
   */
  render() {
    return (
        <div>
          ${this.state.petfolioValue}
        </div>
    );
  }
};

export default PetfolioValue;
