import React, {Component} from 'react';
import Splash from './components/Splash';
import TopNav from './components/TopNav';
import Wrapper from './components/Wrapper';
import SideNav from './components/SideNav';
import MainContentWrapper from './components/MainContentWrapper';
import PortfolioStatus from './components/PortfolioStatus';
import Content from './components/Content';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Petfolio from './components/pages/Petfolio';
// import PetCenter from './components/pages/PetCenter';
import Forum from './components/FriendsBoard/Forum';
import Friends from './pages/Social/Friends';
import Home from './pages/Home';
import About from './components/pages/About';
// import Settings from './components/pages/Settings';
import SigninForm from './components/SigninForm';
import SignoutForm from './components/SignoutForm';
// import Logout from './components/pages/Logout';
import SignUp from './pages/SignUp';
// import Achievements from './components/pages/Achievements';
import DocsList from './components/DocsList/DocsList';
import HelpLanding from './components/HelpLanding/HelpLanding';
// import Inventory from './components/userTabs';
// import Trading from './components/pages/Trading';
// import Modal from 'react-modal';
// import './react-joyride-compiled.css';
import StockTicker from './components/StockTicker/StockTicker';
import ViewStocks from './pages/ViewStocks/ViewStocks';
import TradingCenter from './components/TradingCenter';
import UserSettings from './pages/Settings';
import Login from './pages/Login';
import API from './utils/API';
import Footer from './components/Footer';

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
      isLoggedIn: false,
      userData: {},
    };
    this.navToggleHandler = this.navToggleHandler.bind(this);
  }

  /**
   * Function to check is user is in sessions
   */
  componentDidMount() {
    // Here is api call
    API.getUserProfile().then((res) => {
      console.log(res.data);
      if (res.data === 'User not logged in') {

      } else {
        const user = res.data;
        this.setState({userData: user,
        isLoggedIn: true});
      };
    })
    .catch((err) => {
      console.log(err);
    });
  };

  /** Function that handles the click for the nav button
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
        {this.state.isLoggedIn ? (
          <div className="App">
            <TopNav navToggleHandler={this.navToggleHandler}/>
            <Wrapper>
              <SideNav isActive={this.state.sideNav}/>
              <MainContentWrapper>
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
                    {/* <Route exact path='/logout' component={Logout} /> */}
                    <Route exact path='/' component={Home} />
                    <Route exact path='/about' component={About} />
                    <Route exact path='/signin' component={SigninForm} />
                    <Route exact path='/signout' component={SignoutForm} />
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
                <Footer></Footer>
              </MainContentWrapper>
            </Wrapper>
        </div>
        ) : (
              <Splash />
        )}
      </Router>
    );
  };
};


export default App;
