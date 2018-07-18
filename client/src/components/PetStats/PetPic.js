import React, {Component} from 'react';
import wolfy from '../../assets/images/Wolf1.svg';
import bear from '../../assets/images/Bear1.svg';
import bull from '../../assets/images/Bull1.svg';
import ostrich from '../../assets/images/Ostrich1.svg';
import ostrichrc from '../../assets/images/OstrichRC1.svg';
import ostrichbc from '../../assets/images/OstrichBC1.svg';
import ostrichbt from '../../assets/images/OstrichBowtie1.svg';
import bullrc from '../../assets/images/BullRC1.svg';
import bullbc from '../../assets/images/BullBC1.svg';
import bullbt from '../../assets/images/BullBowtie1.svg';
import bearrc from '../../assets/images/BearRC1.svg';
import bearbc from '../../assets/images/BearBC1.svg';
import bearbt from '../../assets/images/BearBowtie1.svg';
import wolfyrc from '../../assets/images/WolfRC1.svg';
import wolfybc from '../../assets/images/WolfBC1.svg';
import wolfybt from '../../assets/images/WolfBowtie1.svg';
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
            // get the url from the db
            let url = r.data.urlImage;
            let accessory;
            let type;
            // if there's no accessory (undefine), assign a false value
            if (r.data.Accessories[0] !== undefined) {
                accessory = r.data.Accessories[0].equipped;
            } else {
                accessory = false;
            }
            // if there's no type (aka undefined), assign a false value
            if (r.data.Accessories[0] !== undefined) {
                type = r.data.Accessories[0].name;
            } else {
                type = false;
            }
            // compare the image, accessory and type to find the right image
            if (url === './client/src/assets/images/Ostrich1.svg' && accessory === true && type === 'red collar') {
                this.setState({petPic: ostrichrc});
            } else if (url === './client/src/assets/images/Ostrich1.svg' && accessory === true && type === 'blue collar') {
                this.setState({petPic: ostrichbc});
            } else if (url === './client/src/assets/images/Ostrich1.svg' && accessory === true && type === 'bow tie') {
                this.setState({petPic: ostrichbt});
            } else if (url === './client/src/assets/images/Bull1.svg' && accessory === true && type === 'red collar') {
                this.setState({petPic: bullrc});
            } else if (url === './client/src/assets/images/Bull1.svg' && accessory === true && type === 'blue collar') {
                this.setState({petPic: bullbc});
            } else if (url === './client/src/assets/images/Bull1.svg' && accessory === true && type === 'bow tie') {
                this.setState({petPic: bullbt});
            } else if (url === './client/src/assets/images/Bear1.svg' && accessory === true && type === 'red collar') {
                this.setState({petPic: bearrc});
            } else if (url === './client/src/assets/images/Bear1.svg' && accessory === true && type === 'blue collar') {
                this.setState({petPic: bearbc});
            } else if (url === './client/src/assets/images/Bear1.svg' && accessory === true && type === 'bow tie') {
                this.setState({petPic: bearbt});
            } else if (url === './client/src/assets/images/Wolf1.svg' && accessory === true && type === 'red collar') {
                this.setState({petPic: wolfyrc});
            } else if (url === './client/src/assets/images/Wolf1.svg' && accessory === true && type === 'blue collar') {
                this.setState({petPic: wolfybc});
            } else if (url === './client/src/assets/images/Wolf1.svg' && accessory === true && type === 'bow tie') {
                this.setState({petPic: wolfybt});
            } else if (url === './client/src/assets/images/Bull1.svg') {
                this.setState({petPic: bull});
            } else if (url === './client/src/assets/images/Bear1.svg') {
                this.setState({petPic: bear});
            } else if (url === './client/src/assets/images/Wolf1.svg') {
                this.setState({petPic: wolfy});
            } else {
                this.setState({petPic: ostrich});
            };
          }));
      };

    /**
     * @return {*} Container
     */
    render() {
        return (
                <span>
                   <img src={this.state.petPic} width="250px" alt="user's pet" className="mx-auto d-block"/>
                </span>
        );
    }
};

export default PetPic;