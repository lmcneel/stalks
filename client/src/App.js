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
                    text: 'This is the amount of liquid assets, money, that you can use to invest in stocks or spend on your pet for fun items in the shop. You can increase your liquid assets by selling your stocks as well as login bonuses.',
                    selector: '.bankValue',
                  },
                  {
                    title: 'Petfolio Value',
                    text: 'This is the sum of all stocks you own multiplied by the current market value. This is the standard equation professionals use to determine the value of their assets.',
                    selector: '.portfolioValue',
                  },
                  {
                    title: 'Stock Overview',
                    text: 'This is the overview of a stocks stats. There is plenty of useful information here!',
                    selector: '.stockStats',
                  },
                  {
                    title: 'Stock Name',
                    text: 'This is the ticker symbol or stock symbol of this stock. It\'s an abbreviation used to uniquely identify publicly traded shares of a particular stock on a particular stock market. A stock symbol may consist of letters, numbers or a combination of both.',
                    selector: '.stockName',
                  },
                  {
                    title: 'Stock Price',
                    text: 'The is the current price of a single stock from this company. This will update, so keep an eye on it for changes!',
                    selector: '.stockPrice',
                  },
                  {
                    title: 'Percent Change',
                    text: 'This is is percentage that shows negative or positive preformance, compared to the price at the opening of the trading day. Green is positive, red is negative.',
                    selector: '.stockChange',
                  },
                  {
                    title: 'Add to Your Watchlist',
                    text: 'Using the eye icon you can add stocks you own or just ones that you are interested in to your watchlist. You can view Watchlist in the Stock Chart.',
                    selector: '.stockWatch',
                  },
                  {
                    title: 'View Your Watchlist',
                    text: 'The stocks added to your Watchlist scroll here so you can keep an eye on the price per share and the percentage change. You can use this tool to decide when to buy new stocks or sell the ones you have.',
                    selector: '.stockticker',
                  },
                  {
                    title: 'Stock Chart',
                    text: 'This chart tracks the preformance of this stock over the last 30 days. You can easily see how a stock is doing with this helpful chart!',
                    selector: '.chartSection',
                  },
                  {
                    title: 'Shares Owned',
                    text: 'This number is the amount of shares you currently own of this stock.',
                    selector: '.sharesOwned',
                  },
                  {
                    title: 'ROI',
                    text: 'ROI, Return on Investment, is the ratio between the net profit and cost of investment resulting from an investment of a stock. This is a helpful metric to determine if your investment in a stock is performing well. The higher this number, the better that stock is doing. You can also use this simple metric to compare different stocks in your portfolio.',
                    selector: '.roiRow',
                  },
                  {
                    title: 'Price and Date Purchased',
                    text: 'This shows the price of the stock on date you purchased it. This is a good inicator of how your investment has done since you initially purchased it.',
                    selector: '.priceAndDateRow',
                  },
                  {
                    title: 'Making a Transaction',
                    text: 'This form allows you to buy and sell stocks.',
                    selector: '.buySell',
                  },
                  {
                    title: 'Buying and Selling Stocks',
                    text: 'Here you select whether you want to buy or sell your stock.',
                    selector: '.tradeInputs',
                  },
                  {
                    title: 'Number of Shares',
                    text: 'Here you input how many shares you would like to buy or sell.',
                    selector: '.numOfShares',
                  },
                  {
                    title: 'Subtotal and New Bank Value',
                    text: 'The suntotal shows informs you how much money you will make or spend with this transaction. The new bank value informs you what your bank value will be after the transaction is complete.',
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
