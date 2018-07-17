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
<<<<<<< HEAD
                {this.props.petButton}
                {this.props.feedButton}
=======
                </div>
>>>>>>> ef872be2762115c45b8bd1e7140ac1950afbae24
            </div>
        );
    }
};

export default PetStatusBars;
