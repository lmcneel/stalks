import React, {Component} from 'react';

/**
 * @class PetName
 */
class PetName extends Component {
    /**
     * @return {*} Container
     */
    render() {
        return (
                <div>
                   <h3>{this.props.name}</h3>
                </div>
        );
    }
};

export default PetName;
