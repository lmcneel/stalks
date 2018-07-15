import React, { Component } from 'react';
import Splash from './components/Splash';
import TopNav from './components/TopNav';
import Wrapper from './components/Wrapper';
import SideNav from './components/SideNav';
import MainContentWrapper from './components/MainContentWrapper';
import PortfolioStatus from './components/PortfolioStatus';
import Content from './components/Content';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Petfolio from './pages/Petfolio';
// import PetCenter from './components/pages/PetCenter';
// import Forum from './components/pages/Forum';
// import Friends from './components/pages/Friends';
import Home from './pages/Home';
import About from './pages/About';
// import Settings from './components/pages/Settings';
// import Logout from './components/pages/Logout';
import SignUp from './pages/SignUp';
// import Achievements from './components/pages/Achievements';
import ViewStocks from './pages/ViewStocks';
import DocsList from './components/DocsList/DocsList';
import HelpLanding from './components/HelpLanding/HelpLanding';
import Inventory from './components/userTabs';
import Joyride from 'react-joyride';
import Modal from 'react-modal';
import './react-joyride-compiled.css';
import Trading from './components/pages/Trading';
import StockTicker from './components/StockTicker/StockTicker';

/**
 * Class App
 */
class App extends Component {
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.resetTour = this.resetTour.bind(this);
    this.state = {
      sideNav: false,
      modalIsOpen: true,
      run: false,
      showModal: true,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.yes = this.yes.bind(this);
    this.never = this.never.bind(this);
    this.close = this.close.bind(this);
    this.handleJoyrideCallback = this.handleJoyrideCallback.bind(this);
    this.navToggleHandler = this.navToggleHandler.bind(this);
  }
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
    const { joyride } = this.props;

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
   * Function that handles the click for the nav button
   * @param {*} e
   */
  navToggleHandler(e) {
    this.setState({ sideNav: !this.state.sideNav });
  }
  /**
   * Render function for App Component
   * @return {JSX}
   */
  render() {
    return (

      <Router>


        <div className="App">

          <TopNav navToggleHandler={this.navToggleHandler} />
          <Wrapper>
            <SideNav isActive={this.state.sideNav} />
            <MainContentWrapper>

              <Joyride
                ref={(c) => (this.joyride = c)}
                steps={[
                  {
                    title: 'Bank Value',
                    text: 'This is the amount of liquid assets, money, that you can use to invest in stocks or spend on your pet for fun items in the shop.',
                    selector: '.bankValue',
                  },
                  {
                    title: 'Petfolio Value',
                    text: 'This shows you the sum of all stocks multiplied by the current market value. This is the standard equation professionals use to determine the value of their assets. ',
                    selector: '.portfolioValue',
                  },
                  {
                    title: 'Stock Overview',
                    text: 'This shows you the sum of all stocks multiplied by the current market value. This is the standard equation professionals use to determine the value of their assets. ',
                    selector: '.stockStats',
                  },
                  {
                    title: 'Stock Name',
                    text: 'This shows you the sum of all stocks multiplied by the current market value. This is the standard equation professionals use to determine the value of their assets. ',
                    selector: '.stockName',
                  },
                  {
                    title: 'Stock Price',
                    text: 'This shows you the sum of all stocks multiplied by the current market value. This is the standard equation professionals use to determine the value of their assets. ',
                    selector: '.stockPrice',
                  },
                  {
                    title: 'Percent Change',
                    text: 'This shows you the sum of all stocks multiplied by the current market value. This is the standard equation professionals use to determine the value of their assets. ',
                    selector: '.stockChange',
                  },
                  {
                    title: 'Add to Your Watchlist',
                    text: 'This shows you the sum of all stocks multiplied by the current market value. This is the standard equation professionals use to determine the value of their assets. ',
                    selector: '.stockWatch',
                  },
                  {
                    title: 'View Your Watchlist',
                    text: 'This shows you the sum of all stocks multiplied by the current market value. This is the standard equation professionals use to determine the value of their assets. ',
                    selector: '.stockticker',
                  },
                  {
                    title: 'Stock Chart',
                    text: 'This shows you the sum of all stocks multiplied by the current market value. This is the standard equation professionals use to determine the value of their assets. ',
                    selector: '.chartSection',
                  },
                  {
                    title: 'Shares Owned',
                    text: 'This shows you the sum of all stocks multiplied by the current market value. This is the standard equation professionals use to determine the value of their assets. ',
                    selector: '.sharesOwned',
                  },
                  {
                    title: 'ROI',
                    text: 'This shows you the sum of all stocks multiplied by the current market value. This is the standard equation professionals use to determine the value of their assets. ',
                    selector: '.roiRow',
                  },
                  {
                    title: 'Price and Date Purchased',
                    text: 'This shows you the sum of all stocks multiplied by the current market value. This is the standard equation professionals use to determine the value of their assets. ',
                    selector: '.priceAndDateRow',
                  },
                  {
                    title: 'Making a Transaction',
                    text: 'This shows you the sum of all stocks multiplied by the current market value. This is the standard equation professionals use to determine the value of their assets. ',
                    selector: '.buySell',
                  },
                  {
                    title: 'Buying and Selling Stocks',
                    text: 'This shows you the sum of all stocks multiplied by the current market value. This is the standard equation professionals use to determine the value of their assets. ',
                    selector: '.tradeInputs',
                  },
                  {
                    title: 'Number of Shares',
                    text: 'A share is an indivisible unit of capital, expressing the ownership relationship between the company and the shareholder, which is you. ',
                    selector: '.numOfShares',
                  },
                  {
                    title: 'Subtotal and New Bank Value',
                    text: 'This shows you the sum of all stocks multiplied by the current market value. This is the standard equation professionals use to determine the value of their assets. ',
                    selector: '.bottomTwoRows',
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
              <Modal
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
              </Modal>
              
              <PortfolioStatus />
              <StockTicker />
              <Inventory />
              <Content>
                <Switch>
                  <Route exact path="/petfolio" component={Petfolio} />
                  <Route exact path='/trading' component={Trading} />
                  <Route exact path='/splash' component={Splash} />
                  {/* <Route exact path='/petcenter' component={PetCenter} />
                      <Route exact path='/friends' component={Friends} />
                      <Route exact path='/forum' component={Forum} /> */}
                  <Route exact path='/' component={Home} />
                  <Route exact path='/about' component={About} />
                  {/* <Route exact path='/settings' component={Settings} /> */}
                  {/* <Route exact path='/logout' component={Logout} /> */}
                  <Route exact path='/signup' component={SignUp} />
                  {/* <Route exact path='/achievements' component={Achievements} /> */}
                  <Route exact path='/viewstocks' component={ViewStocks} />
                  <Route exact path='/help' component={HelpLanding} />
                  <Route exact path='/docs' component={DocsList} />
                </Switch>
              </Content>
            </MainContentWrapper>
          </Wrapper>
        </div>
      </Router>
    );
  }
}

export default App;
