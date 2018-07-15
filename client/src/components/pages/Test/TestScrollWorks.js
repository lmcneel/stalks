import React, {Component} from 'react';
import StockTicker from './StockTicker';

/**
 * @class Test
 */
class Test extends Component {
   /**
   * Constructor function for setting state
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
     text: 'Scrolling text across page!!!!!',
    };
  }
    /**
     * @return {*} Container
     */
    render() {
      return (
        <div>
          <div className="main">
          <h2>Test Page</h2>
          </div>
          <StockTicker text={this.state.text} />
        </div>
      );
   };
}

export default Test;
