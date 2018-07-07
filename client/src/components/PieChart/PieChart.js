import React from 'react';
import ReactDOM from 'react-dom';
import {VictoryPie} from 'victory';

/**  colorScale is an array of established colors for th slices of pie */

const PieChart = (props) => {
    return (
      <div>
      <VictoryPie
         colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
         height={250}
         data={[
        { x: "Company A", y: 35 },
        { x: "Company B", y: 40 },
        { x: "Company C", y: 55 },
        { x: "Company D", y: 75 },
        ]}
      />
      </div>
    );
};

export default PieChart;
