import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import {PetName, PetPic, PetStats, PetWrapper} from '../PetStats';
import BankValue from '../BankValue/BankValue';
import PetfolioValue from '../PetfolioValue/PetfolioValue';
import PieChart from '../PieChart/PieChart';
import wolfy from './defaultPetPic.png';
// import other 3 pet pics here
import StockTicker from '../StockTicker/StockTicker';
import API from '../../utils/API';


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
      tickerText: 'Watchlist...StockA 2.35...StockB 4.15...StockC 1.28',
    };
  }

    /**
     * Setting state of portfolio and bank values and all pet info(name, pic, stats) once component is mounted
     */
    componentDidMount() {
      API.getPortfolioValue().then(((r) => {
        this.setState({petfolioValue: r});
      }));
      API.getBankValue().then(((r) => {
        this.setState({bankValue: r});
      }));
      // API.getPetInfo().then(((r) => {
      //   this.setState({petName: r???})
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
                <PetfolioValue petfolioValue={this.state.petfolioValue} />
              </Col>
              <Col>
                <BankValue bankValue={this.state.bankValue} />
              </Col>
            </Row>

            {/* Row 2: StockTicker*/}
            <Row>
              <Col>
                <StockTicker text={this.state.tickerText}
                />
              </Col>
            </Row>

            {/** Row 3: PetStats and PieChart*/}
            <Row>
              <Col>
              <div className="main">
                <PetWrapper>

                  <PetPic>
                    {this.state.petPic}
                  </PetPic>

                  <div className="petname">
                    <PetName>
                      {this.state.petName}
                    </PetName>
                  </div>

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
              <PieChart />
          </Col>
        </Row>
        </Col>
        </Row>
      </Container>
    );
  }
};

export default Petfolio;
