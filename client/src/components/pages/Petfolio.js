import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import {PetStats} from '../PetStats';
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
  }
    /**
   * toggle function
   */
  toggle() {
    this.setState({
      modal: !this.state.modal,
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
   * resetTour function
   */
  resetTour() {
    console.dir(this);
    this.joyride.reset(true);
    this.setState({run: true});
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
              text: 'This is the overview of your pet. There is plenty of useful information here!',
              selector: '.statusbarwidth',
            },
            {
              title: 'Fondness',
              text: 'This bar represents your pets pondness. The more you check in on your pet, the more fond your pet will be of you. If you plan on going on a long vacation, you might want to checkout the toys and treats in the shop to maintain your pets fondness while you are away.',
              selector: '.fondness',
            },
            {
              title: 'Happiness',
              text: 'This bar represents your pets pondness. The happiness level of your pet is a direct reflection of your return on investment, ROI, which is the ratio between the net profit and cost of investment resulting from an investment of a stock. In simpler terms, the better your stocks do, the happy your pet will be. There are also toys and treats in the shop which will make your pet very happy.',
              selector: '.happiness',
            }, 
            {
              title: 'Hunger',
              text: 'This bar represents your pets hunger. Just like a real pet, your little fluff ball needs to eat too. A complete bar means they are full but that will slowly drop. The shop has all the meals you need for your pet, just make sure you stop by before they get too hungry and start munching on your money instead!',
              selector: '.hunger',
            },
            {
              title: 'Overall Health',
              text: 'This bar represents the overall happiness, fondness, and hunger of your pet. If this bar is getting low, you may want to look at the sub categories and see if your pet is sad, lonely, or hungry. Buying and trading stocks will help you take care of your pet but you can also use items in the shop for extra help.',
              selector: '.overall',
            },
            {
              title: 'Stocks Pie Chart',
              text: 'This chart shows the distribution of total stocks you hold. Each piece represents an individual company in which you own stocks and the entire chart represents your entire petfolio. Use this as a tool to diversify your petfolio.',
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
        <button type='button' onClick={this.resetTour}>Take a Tour</button>
        <Container fluid>
          {/** global header with app name and right nav icons goes here above next row*/}

          <Row>

            {/** Vertical PetStats and PieChart*/}
            <Col>
              <div className="statusbarwidth">
                <PetStats />
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
