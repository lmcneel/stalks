<<<<<<< HEAD
import React, {Component} from 'react';
=======
import React, { Component } from 'react';
import Splash from './components/Splash';
>>>>>>> c4673eb9f900bb07734dfea82a102e5ec2caed38
import TopNav from './components/TopNav';
import Wrapper from './components/Wrapper';
import SideNav from './components/SideNav';
import MainContentWrapper from './components/MainContentWrapper';
import PortfolioStatus from './components/PortfolioStatus';
import Content from './components/Content';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Petfolio from './pages/Petfolio';
// import PetCenter from './components/pages/PetCenter';
import Forum from './components/FriendsBoard/Forum';
// import Friends from './components/pages/Friends';
// import Home from './pages/Home';
// import About from './pages/About';
// import Settings from './components/pages/Settings';
import SigninForm from './components/SigninForm';
import SignoutForm from './components/SignoutForm';
// import Logout from './components/pages/Logout';
import SignUp from './pages/SignUp';
// import Achievements from './components/pages/Achievements';
import DocsList from './components/DocsList/DocsList';
import HelpLanding from './components/HelpLanding/HelpLanding';
<<<<<<< HEAD
import Inventory from './components/userTabs';
=======
// import Inventory from './components/userTabs';
// import Trading from './components/pages/Trading';
import Modal from 'react-modal';
import './react-joyride-compiled.css';
import StockTicker from './components/StockTicker/StockTicker';
import ViewStocks from './pages/ViewStocks/ViewStocks';
import TradingCenter from './components/TradingCenter';
import Friends from './pages/Social/Friends';
import UserSettings from './pages/Settings';
import Login from './pages/Login';
>>>>>>> c4673eb9f900bb07734dfea82a102e5ec2caed38

/**
* Class App
*/
class App extends Component {
  /**
   *@param {*} props
   */
  constructor(props) {
    super(props);

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
    this.handleSelect = this.handleSelect.bind(this);
    this.resetTour = this.resetTour.bind(this);
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
    this.setState({showModal: false});
  }

  /**
   * Function that handles the click for the nav button
   *@param {*} e
  */
  navToggleHandler(e) {
    this.setState({sideNav: !this.state.sideNav});
  }

  /**
   * Render function for App Component
   * @return {JSX}
   */
  render() {
    return (
      <Router>
<<<<<<< HEAD

=======
>>>>>>> c4673eb9f900bb07734dfea82a102e5ec2caed38
        <div className="App">
            <TopNav navToggleHandler={this.navToggleHandler}/>
            <Wrapper>
              <SideNav isActive={this.state.sideNav}/>
              <MainContentWrapper>
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
                <Content>
                  <Switch>
                    <Route exact path="/petfolio" component={Petfolio} />
                    <Route exact path='/splash' component={Splash} />
                    <Route exact path='/forum' component={Forum} />
                    {/* <Route exact path='/petcenter' component={PetCenter} />
                    <Route exact path='/friends' component={Friends} />
                    // <Route exact path='/forum' component={Forum} />}
                    <Route exact path='/' component={Home} />
                    <Route exact path='/about' component={About} />
                    {/* <Route exact path='/logout' component={Logout} /> */}
                    <Route exact path='/signin' component={SigninForm} />
                    <Route exact path='/logout' component={SignoutForm} />
                    <Route exact path='/signup' component={SignUp} />
                    <Route exact path='/login' component={Login} />
                    <Route path='/settings' component={UserSettings} />
                    {/* <Route exact path='/achievements' component={Achievements} /> */}
                    <Route exact path='/friends' component={Friends} />
                    <Route exact path='/viewstocks' component={ViewStocks} />
                    <Route exact path='/help' component={HelpLanding} />
                    <Route exact path='/docs' component={DocsList} />
                    <Route exact path='/trading' component={TradingCenter} />
                    <Route exact path='/trading/:ticker' component={TradingCenter} />
                  </Switch>
                </Content>
              </MainContentWrapper>
            </Wrapper>
        </div>
      </Router>
    );
  };
};


export default App;
