import React, {Component} from 'react';
// import {ProgressBars2} from '../PetStats/ProgressBars2';
/**
 * @class Petfolio
 */
class CV extends Component {
    /**
     * Constructor function for setting state
     * @param {*} props
     */
    constructor(props) {
        super(props);
        this.state = {
            petStats: [
                {id: 1, petstat: 75},
                {id: 2, petstat: 50},
                {id: 3, petstat: 90},
                {id: 4, petstat: 35},
            ],
        };
    }
    /**
        * @return {*} Container
        */
    render() {
        const stats=this.state.petStats;
        console.log(stats);
        const bars=stats.map((stat) =>
        <div key={stat.id}>{stat.petstat}</div> );
        console.log(bars[1]);

        return (
          <div>
            <div>CV goes here</div>
            <div>
                {bars}
            </div>
          </div>
        );
    }
};

export default CV;
