import React, { Component } from 'react';
import { ProgressBars } from '../PetStats/ProgressBars';

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
                <div className='overall'>
                    <ProgressBars
                        petStatLabel="Overall Health"
                        petStatColor="success"
                        petStatValue={this.state.petStats[0]}
                    />
                </div>
                <div className='hunger'>
                <ProgressBars 
                    petStatLabel="Hunger"
                    petStatColor="danger"
                    petStatValue={this.state.petStats[3]}
                />
                </div>
                <div className='happiness'>
                <ProgressBars 
                    petStatLabel="Happiness"
                    petStatColor="success"
                    petStatValue={this.state.petStats[1]}
                />
                </div>
                <div className='fondness'>
                <ProgressBars 
                    petStatLabel="Fondness"
                    petStatColor="warning"
                    petStatValue={this.state.petStats[2]}
                />
                </div>
            </div>
        );
    }
};

export default PetStatusBars;
