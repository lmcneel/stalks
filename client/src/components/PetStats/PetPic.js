import React, {Component} from 'react';
import wolfy from '../pages/defaultPetPic.png';
// import other images here

/**
 * @class PetPic
 */
class PetPic extends Component {
    /**
   * Constructor function for setting state
   * @param {*} props
   */
    constructor(props) {
        super(props);
        this.state = {
            petPic: wolfy,
         };
    }
    /**
     * @return {*} Container
     */
    render() {
        return (
                <div>
                   <img src={this.state.petPic} width="250px" alt="user's pet" />
                </div>
        );
    }
};

export default PetPic;
