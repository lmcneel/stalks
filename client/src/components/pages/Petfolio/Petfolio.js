import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import {PetName, PetPic, PetStats, PetWrapper} from '/PetStats';
import BankValue from '/BankValue';
import PetfolioValue from '/PetfolioValue';
import PieChart from '/PieChart';
import wolfy from '/defaultPetPic.png';
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
                <Col>
                  <PetfolioValue petfolioValue={this.state.petfolioValue}/>
                </Col>
                <Col>
                  <BankValue bankValue = {this.state.bankValue}/>
                </Col>
              </Row>
              <Row>

              </Row>
              <Row>
                <PieChart />
              </Row>
            </Col>
          </Row>
          {this.state.Watchlist.map(List => <OwnedStock ticker={List} />)}
    </Container>
    );
  }
};

  export default Petfolio;
