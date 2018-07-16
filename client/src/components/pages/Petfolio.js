import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import {PetStatsVert} from '../PetStats';
// import ListStock from '../ListStock/ListStock';
import BankValue from '../BankValue/BankValue';
import PetfolioValue from '../PetfolioValue/PetfolioValue';
import PieChart from '../PieChart/PieChart';
// import StockTicker from '../StockTicker/StockTicker';
// import API from '../../utils/API';
import '../../assets/scss/_petfolio.scss';
// const calc = require('./../../utils/Calc');

/**
 * @class Petfolio
 */
class Petfolio extends Component {
  /**
   * Constructor function for setting state
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      petfolioValue: 500,
      bankValue: 3000,
      portfolioValueColor: 'colorPositive',
      bankValueColor: 'colorPositive',
    };
  }

  /**
   * Setting state of portfolio and bank values and all pet info(name, pic, stats) once component is mounted
   * tempTicker only includes stock symbols from UserWatchList
   * for the api call to get current prices for the ticker tape
   */
  componentDidMount() {
    // calc.portfolioValue().then(((r) => {
    //   this.setState({petfolioValue: r});

    if (this.state.petfolioValue >= 1000) {
      this.setState({portfolioValueColor: 'colorPositive'});
    } else if (this.state.petfolioValue >= 500) {
      this.setState({portfolioValueColor: 'colorNeutral'});
    } else {
      this.setState({petfolioValueColor: 'colorNegative'});
    };
    // }));
    // calc.bankValue().then(((r) => {
    //   this.setState({bankValue: r});
    if (this.state.bankValue > 1000) {
      this.setState({bankValueColor: 'colorPositive'});
    } else if (this.state.bankValue > 1) {
      this.setState({bankValueColor: 'colorNeutral'});
    } else {
      this.setState({bankValueColor: 'colorNegative'});
    };
    // }));
  };

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
              <PetStatsVert />
          </Col>

          <Col>
            <Row>
              <Col>
                <div className={`${this.state.portfolioValueColor} p-4`}>
                  <h5 className="petfolioPortfolioText">Portfolio</h5>
                <PetfolioValue />
                </div>
              </Col>
              <Col>
                <div className={`${this.state.bankValueColor} p-4`}>
                <h5 className="petfolioBankText">Bank</h5>
                <BankValue />
                </div>
              </Col>
            </Row>

            <Row>
              <Col className="pt-4">
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
