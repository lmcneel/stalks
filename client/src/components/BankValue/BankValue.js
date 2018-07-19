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
    this.getUser = this.getUser.bind(this);
    this.bankValue = this.bankValue.bind(this);
    this.state = {
      bankValue: 0,
      portfolio_id: '',

    };
  }
    /**
     * @public componentDidMount function will render elements
     */
    componentDidMount() {
      this.getUser();
      // this.bankValue(this.state.portfolio_id);
    };
    /**
     * @public toggle function for reactstap <Modal> onClick trigger
     * @return {*} rec.sessions.user
     */
    getUser() {
      return API.getUserProfile()
      .then((res) => {
          // Need logic of if user is logged in that will set state varables
          let mongoPrtID = res.data.mongo_portfolio_id;
          return this.setState({portfolio_id: mongoPrtID}),
          this.bankValue(this.state.portfolio_id);
      })
      .catch((err) => console.log(err));
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
      <span>
        ${this.state.bankValue}
      </span>
  );
 }
};

export default BankValue;
