import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import {PetStatsVert} from '../PetStats';
import BankValue from '../BankValue/BankValue';
import PetfolioValue from '../PetfolioValue/PetfolioValue';
import PieChart from '../PieChart/PieChart';
import StockTicker from '../StockTicker/StockTicker';
import API from '../../utils/API';
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
      petfolioValue: 2001,
      bankValue: 2000,
      tickerText: 'Watchlist...StockA 2.35...StockB 4.15...StockC 1.28',
      portfolioValueColor: 'colorPositive',
      bankValueColor: 'colorPositive',
    };
  }

    /**
     * Setting state of portfolio and bank values and all pet info(name, pic, stats) once component is mounted
     */
    componentDidMount() {
      API.getTickerText().then(((r) => {
        if (r.data.length !== 0) {
          let ticker = 'Watchlist...';
          for (let i=0; i<r.data.length; i++) {
            // API.findQuotes(r.data[i]).then(((r2) => {
            //   console.log(r2);
            // }));
            ticker += r.data[i].uniqueStockSymbol + '...';
          }
          this.setState({tickerText: ticker});
          console.log(r.data);
                  console.log(ticker);

        };
      }));

      // calc.portfolioValue().then(((r) => {
      //   this.setState({petfolioValue: r});

            if (this.state.petfolioValue >= 1000) {
              this.setState({portfolioValueColor: 'colorPositive'});
            } else if (this.state.petfolioValue >=500) {
              this.setState({portfolioValueColor: 'colorNeutral'});
            } else {
              this.setState({petfolioValueColor: 'colorNegative'});
            };

      // }));
      // calc.bankValue().then(((r) => {
      //   this.setState({bankValue: r});
      if (this.state.bankValue > 1000) {
        this.setState({bankValueColor: 'colorPositive'});
      } else if (this.state.bankValue >1) {
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
          {/* Col 1:Global side bar*/}
          <Col md="3">
            Side Bar
            </Col>

          {/** Col 2: Feature Content*/}
          <Col md="9">

            {/** Row 1: feature name and petfolio and bank values*/}
            <Row>
              <Col>
                <h2>Petfolio</h2>
              </Col>
              <Col>
                <PetfolioValue petfolioValue={this.state.petfolioValue}
                petfolioColor={this.state.portfolioValueColor}
                />
              </Col>
              <Col>
                <BankValue bankValue={this.state.bankValue} petfolioColor={this.state.bankValueColor}/>
              </Col>
            </Row>

            {/* Row 2: StockTicker*/}
            <Row>
              <Col>
                <StockTicker text={this.state.tickerText}
                />
              </Col>
            </Row>

            {/** Row 3: Vertical PetStats and PieChart*/}
            <Row>
              <Col>
                <div className="statusbarwidth">
                <PetStatsVert />
                </div>
              </Col>

            <Col>
              <Row>
                <Col>
                <PetfolioValue petfolioValue={this.state.petfolioValue} />
              </Col>
              <Col>
                <BankValue bankValue={this.state.bankValue} />
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
      </Col>
      </Row>
      </Container>
    );
  }
};

export default Petfolio;
