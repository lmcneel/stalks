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
      portfolio_id: '5b4bc46134b6a866d293bcb5',
    };
  }
/**
 * @public componentDidMount function will render elements
*/
  componentDidMount() {
    this.portfolioValue(this.state.portfolio_id);
  };

/**
 * @public portfolioerValue function that gets users current portfoli value from mongo database
 * @param {*} portfolio
 * @return {*} returna users currentValue
 * This function wil give the Current user portfoli value
 * The input needs to be teh User Portfolio ID.
*/
portfolioValue(portfolio) {
    let PV = 0;
    return API.getMyPortfolio(portfolio)
          .then((res) => {
            console.log(res.data);
              let data = res.data;
              PV = (data[0].currentValue).toFixed(2);
              return this.setState({petfolioValue: PV});
          })
          .catch((err) => console.log(err));
    };

  /**
   * @return {*} Container
   */
  render() {
    return (
        <div>
          ${this.state.petfolioValue}
        </div>
    );
  }
};

export default PetfolioValue;
