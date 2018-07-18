import React, {Component} from 'react';
import {Container, Row, Col, Button} from 'reactstrap';
import {PetStatsVert} from './../PetStats';
import OwnedStock from './../OwnedStock/OwnedStock';
import BankValue from './../BankValue/BankValue';
import PetfolioValue from './../PetfolioValue/PetfolioValue';
import PieChart from './../PieChart/PieChart';
import Joyride from 'react-joyride';
import ModalTwo from 'react-modal';
import '../../assets/scss/_petfolio.scss';

const joyridePetfolio = [
  {
    title: 'Bank Value',
    text: 'This is the amount of money that you can use to invest in stocks or spend on your pet for fun items in the shop. You can increase your liquid assets by selling your stocks as well as login bonuses.',
    selector: '.bankValue',
  },
  {
    title: 'Petfolio Value',
    text: 'This is the sum of all stocks you own multiplied by the current market value. This is the standard equation professionals use to determine the value of their assets.',
    selector: '.portfolioValue',
  },
  {
    title: 'Your Pet Overview',
    text: 'This is where you can monitor your pet. There is plenty of useful information here!',
    selector: '.statusbarwidth',
  },
  {
    title: 'Fondness',
    text: 'This bar represents your pet\'s fondness. The more you check in on your pet, the more fond your pet will be of you. If you plan on going on a long vacation, you might want to checkout the toys and treats in the shop to maintain your pet\'s fondness while you are away.',
    selector: '.fondness',
  },
  {
    title: 'Happiness',
    text: 'This bar represents your pet\'s happiness. The happiness level of your pet is a direct reflection of your return on investment, ROI, which is the ratio between the net profit and cost of investment resulting from an investment of a stock. In simpler terms, the better your stocks do, the happy your pet will be. There are also toys and treats in the shop which will make your pet very happy.',
    selector: '.happiness',
  },
  {
    title: 'Hunger',
    text: 'This bar represents your pet\'s hunger. Just like a real pet, your little fluff ball needs to eat too. A complete bar means they are full, but that will slowly drop. The shop has all the meals you need for your pet, just make sure you stop by before they get too hungry and start munching on your money instead!',
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
  {
    title: 'Time To Go Buy Stocks!',
    selector: '.tradeCenterLink',
    style: {
      footer: {
        display: 'none',
      },
    },
  },

];

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
      sideNav: false,
      modalIsOpen: true,
      run: false,
      showModal: true,
    };
    this.toggle = this.toggle.bind(this);
    this.resetTour = this.resetTour.bind(this);
    this.openModal = this.openModal.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.yes = this.yes.bind(this);
    this.never = this.never.bind(this);
    this.close = this.close.bind(this);
    this.handleJoyrideCallback = this.handleJoyrideCallback.bind(this);
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
    if (this.state.petfolioValue >= 1000) {
      this.setState({portfolioValueColor: 'colorPositive'});
    } else if (this.state.petfolioValue >= 500) {
      this.setState({portfolioValueColor: 'colorNeutral'});
    } else {
      this.setState({petfolioValueColor: 'colorNegative'});
    }

    if (this.state.bankValue > 1000) {
      this.setState({bankValueColor: 'colorPositive'});
    } else if (this.state.bankValue > 1) {
      this.setState({bankValueColor: 'colorNeutral'});
    } else {
      this.setState({bankValueColor: 'colorNegative'});
    }
  };

  /**
   * openModal function
   */
  openModal() {
    this.setState({modalIsOpen: true});
  }

  /**
   * closeModal function
   */
  closeModal() {
    this.setState({modalIsOpen: false});
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

    if (result.action === 'close') {
      this.setState({run: false});
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
   * yes function
   */
  yes() {
    this.closeModal();
    this.setState({run: true});
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
    this.setState({showModal: false});
  }

  /**
   * @return {*} Container
   */
  render() {
    return (
      <div>
        <Joyride
          ref={(c) => (this.joyride = c)}
          steps={joyridePetfolio}
          run={this.state.run} // or some other boolean for when you want to start it
          type={'continuous'}
          showOverlay={true}
          allowClicksThruHole={true}
          autoStart={this.state.run}
          disableOverlay={true}
          showSkipButton={true}
          callback={this.handleJoyrideCallback}
        />
        <Button type='button' onClick={this.resetTour}>Take a Tour</Button>
        <ModalTwo
          className="modal"
          overlayClassName="modal-overlay"
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="prototype Modal"
          show={this.state.showModal}
          onHide={this.close}
          ariaHideApp={false}
        >
          <h2 className="modal-title">Welcome!</h2>
          <div className="modal-content">Would you like to start the walkthrough tutorial?</div>
          <button onClick={this.yes} className="modal-button">Yes!</button>
          <button onClick={this.closeModal}>Later</button>
          <button onClick={this.never}>never again...</button>
        </ModalTwo>
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
                  <div className={`${this.state.portfolioValueColor} border rounded colorBoxes p-4`}>
                    <h5 className="petfolioPortfolioText">Petfolio Value</h5>

                    <PetfolioValue />
                  </div>
                </Col>
                <Col>
                  <div className={`${this.state.bankValueColor} border rounded colorBoxes p-4`}>
                    <h5 className="petfolioBankText">Bank</h5>
                    <BankValue />
                  </div>
                </Col>
              </Row>

              <Row className='pieChart'>
                <Col className="pt-4">
                  <PieChart />
                </Col>
              </Row>
            </Col>
          </Row>
          {/* This row contains the owned stock details -- trading component*/}
          <Row>
            <Col className="py-4">
              <div className="bg-light border rounded p-4">
                <h5>Owned Stocks</h5>
                <OwnedStock />
              </div>
            </Col>
          </Row>
          {/* <Row>
            <Col>{this.state.Watchlist.map((List) => <OwnedStock ticker={List} n/>)}
            </Col>
          </Row> */}

        </Container>
      </div>
    );
  }
};

export default Petfolio;
