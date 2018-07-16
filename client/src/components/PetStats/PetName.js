import React, {Component} from 'react';

/**
 * @class PetName
 */
class PetName extends Component {
    /**
   * Constructor function for setting state
   * @param {*} props
   */
    constructor(props) {
        super(props);
        this.state = {
            petName: 'Wolff',
         };
    }
    /**
     * @return {*} Container
     */
    render() {
        return (
                <span>
                   <h3>{this.state.petName}</h3>
                </span>
        );
    }
};

export default PetName;
