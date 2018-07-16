import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import {PetName, PetPic, PetStats, PetWrapper} from '/PetStats';
import BankValue from '/BankValue';
import PetfolioValue from '/PetfolioValue';
import PieChart from '/PieChart';
import wolfy from '/defaultPetPic.png';
import Joyride from 'react-joyride';
import ModalTwo from 'react-modal';
import '../../../assets/react-joyride-compiled.css';

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
    this.resetTour = this.resetTour.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      sideNav: false,
      modalIsOpen: true,
      run: false,
      showModal: true,
    };
    this.openModal = this.openModal.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.yes = this.yes.bind(this);
    this.never = this.never.bind(this);
    this.close = this.close.bind(this);
    this.handleJoyrideCallback = this.handleJoyrideCallback.bind(this);
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
 * openModal function
 */
  openModal() {
    this.setState({ modalIsOpen: true });
  }
  /**
   * closeModal function
   */
  closeModal() {
    this.setState({modalIsOpen: false });
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
    this.setState({showModal: false});
  }

  /**
   * Setting state of bank value
   */
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
              title: 'Bank Value',
              text: 'BALH BLAH This is the amount of liquid assets, money, that you can use to invest in stocks or spend on your pet for fun items in the shop. You can increase your liquid assets by selling your stocks as well as login bonuses.',
              selector: '.bankValue',
            },
            {
              title: 'Bank Value',
              text: 'This is the amount of liquid assets, money, that you can use to invest in stocks or spend on your pet for fun items in the shop. You can increase your liquid assets by selling your stocks as well as login bonuses.',
              selector: '.bankValue',
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
                  <PetfolioValue petfolioValue={this.state.petfolioValue} />
                </Col>
                <Col>
                  <BankValue bankValue={this.state.bankValue} />
                </Col>
              </Row>
              <Row>

              </Row>
              <Row>
                <PieChart />
                
              </Row>
            </Col>
          </Row>

        </Container>
      </div>
    );
  }
};

export default Petfolio;
