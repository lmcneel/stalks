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
    this.getUser = this.getUser.bind(this);
    this.portfolioValue = this.portfolioValue.bind(this);
    this.state = {
      petfolioValue: 0,
      portfolio_id: '',
    };
  }
    /**
     * @public componentDidMount function will render elements
     */
    componentDidMount() {
      // this.portfolioValue(this.state.portfolio_id);
      this.getUser();
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
          console.log(mongoPrtID);
          return this.setState({portfolio_id: mongoPrtID}),
          this.portfolioValue(this.state.portfolio_id);
      })
      .catch((err) => console.log(err));
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
