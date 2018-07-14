import React, {Component} from 'react';
// import other images here

/**
 * @class PetPic
 */
class PetPic extends Component {
    /**
     * @return {*} Container
     */
    render() {
        return (
                <div>
                   <img src={this.props.pic} width="250px" alt="user's pet" />
                </div>
        );
    }
};

export default PetPic;
