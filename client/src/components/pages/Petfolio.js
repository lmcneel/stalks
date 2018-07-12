import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import {PetName, PetStats, PetWrapper} from '../PetStats';
import PetPic from '../PetStats/PetPic';
import BankValue from '../BankValue/BankValue';
import PetfolioValue from '../PetfolioValue/PetfolioValue';
import PieChart from '../PieChart/PieChart';

// import other 3 pet pics here
import StockTicker from '../StockTicker/StockTicker';
// import '../../assets/scss/_petfolio.scss';
// import API from './../../utils/API';
// const calc = require('./../../utils/Calc');

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
      // petPic: wolfy,
      petStats: [85, 90, 50, 70],
      // tickerText,
      petfolioValue: '$1000',
      bankValue: '$2000',
      tickerText: 'Watchlist...StockA 2.35...StockB 4.15...StockC 1.28',
    };
  }

    /**
     * Setting state of portfolio and bank values and all pet info(name, pic, stats) once component is mounted
     */
    componentDidMount() {
      // console.log('here');
      // API.getTickerText().then(((r) => {
      //   console.log('---------------------------'+r);
      //   if (r !== []) {
      //     this.setState({tickerText: r});
      //   };
      // }));
      // calc.portfolioValue().then(((r) => {
      //   this.setState({petfolioValue: r});
      // }));
      // calc.bankValue().then(((r) => {
      //   this.setState({bankValue: r});
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

          <Col md="9">

            {/** Row 1: Global --Page(feature) name and petfolio and bank values*/}
            <Row>
              <Col>
                <h2>Petfolio</h2>
              </Col>
              <Col>
                <PetfolioValue petfolioValue={this.state.petfolioValue} />
              </Col>
              <Col>
                <BankValue bankValue={this.state.bankValue} />
              </Col>
            </Row>

            {/* Row 2: Global -- StockTicker*/}
            <Row>
              <Col>
                <StockTicker text={this.state.tickerText}
                />
              </Col>
            </Row>

            {/** Row 3: PetStats and PieChart*/}
            <Row>
              <Col>
              <div className="petStats">
                <PetWrapper>
                  <div>
                     <PetPic />

                  </div>
                  <PetName>
                      {this.state.petName}
                    </PetName>

                  <div className="statusbars">
                    <PetStats
                      petStat="Overall Health"
                      petStatColor="success"
                      petStatValue={this.state.petStats[0]}
                    />
                    <PetStats
                      petStat="Hunger"
                      petStatColor="danger"
                      petStatValue={this.state.petStats[3]}
                    />
                    <PetStats
                      petStat="Happiness"
                      petStatColor="info"
                      petStatValue={this.state.petStats[1]}
                    />
                    <PetStats
                      petStat="Fondness"
                      petStatColor="warning"
                      petStatValue={this.state.petStats[2]}
                    />
                  </div>
                </PetWrapper>
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
