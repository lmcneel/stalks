import React, {Component} from 'react';
import {VictoryPie} from 'victory';

/**  colorScale is an array of established colors for th slices of pie */

/**
 * @class PieChart
 */
class PieChart extends Component {
  /**
   * Constructor function for setting state
   * @param {*} props
   */
  constructor(props) {
      super(props);
      this.state = {
          pieData: [
            {x: 'Company A', y: 35},
            {x: 'Company B', y: 40},
            {x: 'Company C', y: 55},
            {x: 'Company D', y: 75},
            ],
      };
  }
  /**
    * @return {*} Container
    */
  render() {
    return (
<<<<<<< HEAD
      <div class="pieChart">
=======

      <div>
>>>>>>> 7120e4a52f035f889e9a91ad0abcfb049b81c497
      <VictoryPie
         colorScale={['tomato', 'orange', 'gold', 'cyan', 'navy']}
         height={250}
         data={this.state.pieData}
      />
      </div>
    );
  }
};

export default PieChart;
