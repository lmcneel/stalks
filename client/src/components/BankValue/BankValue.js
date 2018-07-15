import React, {Component} from 'react';
import API from '../../utils/API';
/**
 * @class BankValue
 */
class BankValue extends Component {
  /**
 * Constructor function for setting state
 * @param {*} props
 */
  constructor(props) {
    super(props);
    this.bankValue = this.bankValue.bind(this);
    this.state = {
      bankValue: 3500,
      portfolio_id: '5b4bb52474beb5422050fc00',
    };
  }
    /**
     * @public componentDidMount function will render elements
     */
    componentDidMount() {
      this.bankValue(this.state.portfolio_id);
    };

    /**
     * @public bankValue function that gets users bank value from mongo database
     * @param {*} portfolio
     * @return {*} returns users bank value
     * This function will give the Current user Cash
     * The input needs to be the User Portfolio ID.
    */
    bankValue(portfolio) {
      let bank = 0;
      return API.getMyPortfolio(portfolio)
          .then((res) => {
            console.log(res.data);
            
              let data = res.data;
              bank = (data[0].cash).toFixed(2);
              // return bank;
              return this.setState({bankValue: bank});
          })
          .catch((err) => console.log(err));
          // this.setState({bankValue: bank});
    };


  /**
   * @return {*} Container
   */
  render() {
    return (
      <div>
        ${this.state.bankValue}
      </div>
  );
 }
};

export default BankValue;
