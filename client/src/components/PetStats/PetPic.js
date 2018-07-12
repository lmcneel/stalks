import React, {Component} from 'react';
import wolfy from '../pages/defaultPetPic.png';
// import PropTypes from 'prop-types';

// const propTypes = {
//     children: PropTypes.oneOfType([
//         PropTypes.arrayOf(PropTypes.element),
//         PropTypes.element,
//         PropTypes.string,
//     ]),
// };
/**
 * @class Portfolio
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
// const PetPic = (props) => {
//     return (
//       <div>
//         <img src={props.children} width="250px" alt="user's pet" />
//       </div>
//     );
// };
// PetPic.propTypes = propTypes;

export default PetPic;
