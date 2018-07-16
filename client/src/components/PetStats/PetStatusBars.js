import React, {Component} from 'react';
import {ProgressBars} from '../PetStats/ProgressBars';

/**
 * @class PetStatusBars
 */
class PetStatusBars extends Component {
    /**
     * Constructor function for setting state
     * @param {*} props
     */
    constructor(props) {
        super(props);
        this.state = {
            petStats: [70, 100, 40, 10],
        };
    }
    /**
        * @return {*} Container
        */
    render() {
        return (

            <div className="statusbars">
                <ProgressBars
                    petStatLabel="Overall Health"
                    petStatColor="success"
                    petStatValue={this.state.petStats[0]}
                />
                <ProgressBars
                    petStatLabel="Hunger"
                    petStatColor="danger"
                    petStatValue={this.state.petStats[3]}
                />
                <ProgressBars
                    petStatLabel="Happiness"
                    petStatColor="success"
                    petStatValue={this.state.petStats[1]}
                />
                <ProgressBars
                    petStatLabel="Fondness"
                    petStatColor="warning"
                    petStatValue={this.state.petStats[2]}
                />
            </div>
        );
    }
};

export default PetStatusBars;
