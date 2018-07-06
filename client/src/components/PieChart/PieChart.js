import React from 'react';
import ReactDOM from 'react-dom';
import {VictoryPie} from 'victory';

export const PieChart = (props) => {
    return (
      <div>
      <VictoryPie
         data={[
        { x: "Cats", y: 35 },
        { x: "Dogs", y: 40 },
        { x: "Birds", y: 55 }
        ]}
      />
      </div>
    );
};

export default PieChart;
