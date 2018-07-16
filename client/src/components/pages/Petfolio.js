import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { PetStatsVert } from '../PetStats';
// import ListStock from '../ListStock/ListStock';
import BankValue from '../BankValue/BankValue';
import PetfolioValue from '../PetfolioValue/PetfolioValue';
import PieChart from '../PieChart/PieChart';
// import StockTicker from '../StockTicker/StockTicker';
// import API from '../../utils/API';
import '../../assets/scss/_petfolio.scss';
// const calc = require('./../../utils/Calc');
import Joyride from 'react-joyride';
import '../../assets/react-joyride-compiled.css';

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
      modalIsOpen: true,
      run: false,
      showModal: true,
    };
    this.toggle = this.toggle.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.resetTour = this.resetTour.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.yes = this.yes.bind(this);
    this.never = this.never.bind(this);
    this.close = this.close.bind(this);
    this.handleJoyrideCallback = this.handleJoyrideCallback.bind(this);

  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  };
  /**
   * Setting state of portfolio and bank values and all pet info(name, pic, stats) once component is mounted
   * tempTicker only includes stock symbols from UserWatchList
   * for the api call to get current prices for the ticker tape
   */
  componentDidMount() {
    // calc.portfolioValue().then(((r) => {
    //   this.setState({petfolioValue: r});

    if (this.state.petfolioValue >= 1000) {
      this.setState({ portfolioValueColor: 'colorPositive' });
    } else if (this.state.petfolioValue >= 500) {
      this.setState({ portfolioValueColor: 'colorNeutral' });
    } else {
      this.setState({ petfolioValueColor: 'colorNegative' });
    };
    // }));
    // calc.bankValue().then(((r) => {
    //   this.setState({bankValue: r});
    if (this.state.bankValue > 1000) {
      this.setState({ bankValueColor: 'colorPositive' });
    } else if (this.state.bankValue > 1) {
      this.setState({ bankValueColor: 'colorNeutral' });
    } else {
      this.setState({ bankValueColor: 'colorNegative' });
    };
    // }));
  };
  /**
  * openModal function
  */
  openModal() {
    this.setState({ modalIsOpen: true });
  }
  /**
   * closeModal function
   */
  closeModal() {
    this.setState({ modalIsOpen: false });
  }
  /**
  * handleSelect function
  * @param {number} index
  * @param {number} last
  */
  handleSelect(index, last) {
    if (this.joyride.getProgress().index === 2) {
      setTimeout(() => {
        this.joyride.next();
      }, 1);
    }
  }
  /**
  * handleSelect function
  * @param {number} result
  */
  handleJoyrideCallback(result) {
    const {joyride} = this.props;

    if (result.action == 'close') {
      this.setState({ run: false });
    }
  }
  /**
   * resetTour function
   */
  resetTour() {
    console.dir(this);
    this.joyride.reset(true);
    this.setState({ run: true });
  }
  /**
   * yes function
   */
  yes() {
    this.closeModal();
    this.setState({ run: true });
  }
  /**
   * never function
   */
  never() {
    this.closeModal();
    this.close();
  }
  /**
   * close function
   */
  close() {
    this.setState({ showModal: false });
  }
  /**
   * @return {*} Container
   */
  render() {
    return (
      <div>
        <Joyride
          ref={(c) => (this.joyride = c)}
          steps={[
            {
              title: 'Your Pet Overview',
              text: 'This is the amount of liquid assets, money, that you can use to invest in stocks or spend on your pet for fun items in the shop. You can increase your liquid assets by selling your stocks as well as login bonuses.',
              selector: '.statusbarwidth',
            },
            {
              title: 'Fondness',
              text: 'This is the sum of all stocks you own multiplied by the current market value. This is the standard equation professionals use to determine the value of their assets.',
              selector: '.fondness',
            },
            {
              title: 'Happiness',
              text: 'This is the overview of a stocks stats. There is plenty of useful information here!',
              selector: '.happiness',
            }, 
            {
              title: 'Hunger',
              text: 'This is is percentage that shows negative or positive preformance, compared to the price at the opening of the trading day. Green is positive, red is negative.',
              selector: '.hunger',
            },
            {
              title: 'Overall Health',
              text: 'This is is percentage that shows negative or positive preformance, compared to the price at the opening of the trading day. Green is positive, red is negative.',
              selector: '.overall',
            },
            {
              title: 'Overall Health',
              text: 'This is is percentage that shows negative or positive preformance, compared to the price at the opening of the trading day. Green is positive, red is negative.',
              selector: '.pieChart',
            },
          ]}
          run={this.state.run} // or some other boolean for when you want to start it
          type={'continuous'}
          showOverlay={true}
          allowClicksThruHole={true}
          autoStart={this.state.run}
          disableOverlay={true}
          showSkipButton={true}
          callback={this.handleJoyrideCallback}
        />
        <button type="button" onClick={this.resetTour}>Reset Tour</button>
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
                  <div className={this.state.portfolioValueColor}>
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

              <Row className='pieChart'>
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
      </div>
    );
  }
};

export default Petfolio;
