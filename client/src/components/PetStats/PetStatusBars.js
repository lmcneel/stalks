import React, { Component } from 'react';
import { ProgressBars } from '../PetStats/ProgressBars';

/**
 * @class PetStatusBars
 */
class PetStatusBars extends Component {
    /**
        * @return {*} Container
        */
    render() {
        return (

            <div className="statusbars">
                <ProgressBars
                    petStatLabel="Overall Health"
                    petStatColor="success"
                    petStatValue={this.props.overallHealth}
                />
                <div>
                <ProgressBars
                    petStatLabel="Hunger"
                    petStatColor="danger"
                    petStatValue={this.props.hunger}
                />
                </div>
                <div className='happiness'>
                <ProgressBars 
                    petStatLabel="Happiness"
                    petStatColor="info"
                    petStatValue={this.props.happiness}
                />
                </div>
                <div className='fondness'>
                <ProgressBars 
                    petStatLabel="Fondness"
                    petStatColor="warning"
                    petStatValue={this.props.fondness}
                />
                </div>
                {this.props.petButton}
                {this.props.feedButton}
            </div>
        );
    }
};

export default PetStatusBars;
