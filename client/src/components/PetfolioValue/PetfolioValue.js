import React, {Component} from 'react';
import API from '../../utils/API';

/**
 * @class PetfolioValue
 */
class PetfolioValue extends Component {
  /**
 * Constructor function for setting state
 * @param {*} props
 */
  constructor(props) {
    super(props);
    this.portfolioValue = this.portfolioValue.bind(this);
    this.state = {
      petfolioValue: 500,

      portfolio_id: '5b4cf8a4f387eda4bd04e253',
    };
  }
    /**
     * @public componentDidMount function will render elements
     */
    componentDidMount() {
      this.portfolioValue(this.state.portfolio_id);
    };


    /**
     * @public portfolioValue function that gets users currentValue from mongo database
     * @param {*} portfolio
     * @return {*} returns users bank value
     * This function will give the Current user Cash
     * The input needs to be the User Portfolio ID.
    */
   portfolioValue(portfolio) {
    let PV = 0;
    return API.getMyPortfolio(portfolio)
        .then((res) => {
          console.log(res.data);
            let data = res.data;
            PV = (data[0].currentValue.toFixed(2));
            return this.setState({petfolioValue: PV});
        })
        .catch((err) => console.log(err));
    };
  /**
   * @return {*} Container
   */
  render() {
    return (
        <span>
          ${this.state.petfolioValue}
        </span>
    );
  }
};

export default PetfolioValue;
