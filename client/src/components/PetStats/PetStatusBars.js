import React, {Component} from 'react';
import {ProgressBars} from '../PetStats/ProgressBars';

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
                <ProgressBars
                    petStatLabel="Happiness"
                    petStatColor="info"
                    petStatValue={this.props.happiness}
                />
                <ProgressBars
                    petStatLabel="Fondness"
                    petStatColor="warning"
                    petStatValue={this.props.fondness}
                />
                <button className='petButton' onClick={this.props.petHandler}>Pet</button>
            </div>
        );
    }
};

export default PetStatusBars;
