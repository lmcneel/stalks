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
>>>>>>> a1000a89fe5369faf365d18179c840952902f3fc
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
