import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import {PetStatsVert} from '../PetStats';
import BankValue from '../BankValue/BankValue';
import PetfolioValue from '../PetfolioValue/PetfolioValue';
import PieChart from '../PieChart/PieChart';
import '../../assets/scss/_petfolio.scss';

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
      // set the Petfolio Value box background color according to PetfolioValue
      if (this.state.petfolioValue >= 1000) {
        this.setState({portfolioValueColor: 'colorPositive'});
      } else if (this.state.petfolioValue >=500) {
        this.setState({portfolioValueColor: 'colorNeutral'});
      } else {
        this.setState({petfolioValueColor: 'colorNegative'});
      };

      // set the bankValue box background color according to bankValue
      if (this.state.bankValue > 1000) {
        this.setState({bankValueColor: 'colorPositive'});
      } else if (this.state.bankValue >1) {
        this.setState({bankValueColor: 'colorNeutral'});
      } else {
        this.setState({bankValueColor: 'colorNegative'});
      };
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
                <div className="statusbarwidth">
                <PetStatsVert />
                </div>
              </Col>

            <Col>
              <Row>
              <Col>
                <div className= {`${this.state.portfolioValueColor} border rounded colorBoxes`}>
                Petfolio Value
                <PetfolioValue />
                </div>
              </Col>
              <Col>
                <div className={`${this.state.bankValueColor} border rounded colorBoxes`}>
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
