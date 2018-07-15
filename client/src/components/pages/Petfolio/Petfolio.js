import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import {PetStatsVert} from '../PetStats';
// import ListStock from '../ListStock/ListStock';
import BankValue from '../BankValue/BankValue';
import PetfolioValue from '../PetfolioValue/PetfolioValue';
import PieChart from '../PieChart/PieChart';
// import other 3 pet pics here
// import API from './../../utils/API';
// import StockTicker from '../../components/StockTicker.js';

/**
 * @class Portfolio
 */
class Petfolio extends Component {
  /**
   * Constructor function for setting state
   * @param {*} props
   */
    constructor(props) {
      super(props);
      this.state = {
      petName: 'Wolf',
      petPic: wolfy,
      petStats: [85, 90, 50, 70],
      petfolioValue: '$1000',
      bankValue: '$2000',
      // watchStocks: ['Ace 2.35  Betaa 4.15  Candi 1.28'],
    };
    }

    /**
     * Setting state of port value when rendered
     */
    componentDidMount() {
      // API.getPortfolioValue().then(((r) => {
      //   this.setState({petfolioValue: r});
      // }));
      // API.getBankValue().then(((r) => {
      //   this.setState({bankValue: r});
      // }));
    };

    /**
     * Setting state of bank value
     */
    /**
     * @return {*} Container
     */
    render() {
      return (

        <Container fluid>
        {/** global header with app name and right nav icons goes here above next row*/}

        <Row>

            {/** Vertical PetStats and PieChart*/}
              <Col>
                <div className="statusbarwidth">
                <PetStatsVert />
                </div>
              </Col>

            <Col>
              <Row>
              <Col>
                <div className= {this.state.portfolioValueColor}>
                Petfolio Value
                <PetfolioValue />
                </div>
              </Col>
              <Col>
                <div className={this.state.bankValueColor}>
                Bank Value
                <BankValue />
                </div>
              </Col>
              </Row>

              <Row>
                <Col>
                 <PieChart />
                </Col>
              </Row>
            </Col>

          </Row>

          {/* This row contains the owned stock details -- trading component*/}
          {/* <i class="fas fa-chevron-circle-down"></i>  or     f13a*/}

          <Row>
            <Col>
            </Col>
          </Row>

      </Container>
    );
  }
};

  export default Petfolio;
