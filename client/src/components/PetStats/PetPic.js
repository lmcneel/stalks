import React, {Component} from 'react';
import wolfy from '../../assets/images/Wolf1.svg';
import bear from '../../assets/images/Bear1.svg';
import bull from '../../assets/images/Bull1.svg';
import ostrich from '../../assets/images/Ostrich1.svg';
import API from '../../utils/API';
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
            petPic: [],
         };
    }
    /**
     * setting state of picture
     */
    componentDidMount() {
        API.getUserPic().then(((r) => {
              let url = r.data.urlImage;
            console.log(url);
            if (url = './client/src/assets/images/Ostrich1.svg') {
                this.setState({petPic: ostrich});
            } else if (url = './client/src/assets/images/Bull1.svg') {
                this.setState({petPic: bull});
            } else if (url = './client/src/assets/images/Bear1.svg') {
                this.setState({petPic: bear});
            } else {
                this.setState({petPic: wolfy});
            };
              // console.log(r.data);
              console.log(r.data.urlImage);
          }));
      };

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
