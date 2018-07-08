import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import {PetName, PetPic, PetStats, PetWrapper} from '../../components/PetStats';
import BankValue from '../../components/BankValue';
import PetfolioValue from '../../components/PetfolioValue';
import PieChart from '../../components/PieChart';
import wolfy from './defaultPetPic.png';
// import other 3 pet pics here
import StockTicker from '../../components/StockTicker/StockTicker';
import './Petfolio.css';
import API from './../../utils/API';

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
      watchStocks: 'Watchlist:...StockA 2.35...StockB 4.15...StockC 1.28',
    };
    }

    /**
     * Setting state of port value when rendered
     */
    componentDidMount() {
      API.getPortfolioValue().then(((r) => {
        this.setState({portfolioValue: r});
      }));
    };

    /**
     * Setting state of bank value
     */
    componentWillMount() {
      API.getBankValue().then(((r) => {
        this.setState({bankValue: r});
      }));
    }

    /**
     * @return {*} Container
     */
    render() {
      return (

        <Container fluid>
          <Row>
            <Col size="md-3">
            Side Bar
            </Col>
            <Col size="md-3">
              <div className="main">
              <h2>Petfolio Page</h2>

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

            <Col size="md-6">
            <Row>
                <StockTicker stockticker={this.state.watchStocks} />
              </Row>
              <Row>
                <Col>
                  <PetfolioValue petfolioValue={this.state.petfolioValue} />
                </Col>
                <Col>
                  <BankValue bankValue={this.state.bankValue} />
                </Col>
              </Row>
              <Row>
                <PieChart />
              </Row>
            </Col>
          </Row>

    </Container>
    );
  }
};

  export default Petfolio;
