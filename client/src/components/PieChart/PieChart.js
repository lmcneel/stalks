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

      <div className="bg-light border rounded p-4 pieChart">
      <h5 className="">Portfolio Visualization</h5>
      <VictoryPie
         colorScale={['#45CC8E', '#EE4A37', '#FBB424', '#0C425C']}
         height={250}
         data={this.state.pieData}
         style={{
          labels: {
            fontSize: 14, textTransform: 'uppercase', fontFamily: 'Rubik', letterSpacing: 1}}}
      />
      </div>
    );
  }
};

export default PieChart;
