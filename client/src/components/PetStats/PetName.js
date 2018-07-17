import React, {Component} from 'react';
import API from '../../utils/API';

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
            petName: [],
         };
    }
     /**
     * setting state of name
     */
    componentDidMount() {
        API.getUserPic().then(((r) => {
            if (r.data !== null) {
                let stockpetname = r.data.petName;
                this.setState({petName: stockpetname});
            }
        }));
    };

    /**
     * @return {*} Container
     */
    render() {
        return (
                <div>
                   <h3>{this.state.petName}</h3>
                </div>
        );
    }
};

export default PetName;
