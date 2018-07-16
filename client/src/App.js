import React, {Component} from 'react';
import SigninForm from './components/SigninForm';
import SignupForm from './components/SignupForm';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebookF, faGoogle } from '@fortawesome/fontawesome-free-brands';
import { faAt, faKey } from '@fortawesome/fontawesome-free-solid';

library.add(faFacebookF | faGoogle | faAt | faKey);

// import CollapseRow from './components/CollapseRow/index';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Petfolio from './pages/Petfolio';
import Trading from './pages/Trading';
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
import Forum from './components/FriendsBoard/Forum';
// import Friends from './components/pages/Friends';
// import Home from './pages/Home';
// import About from './pages/About';
// import Settings from './components/pages/Settings';
// import Logout from './components/pages/Logout';
import SignUp from './pages/SignUp';
// import Achievements from './components/pages/Achievements';
import DocsList from './components/DocsList/DocsList';
import HelpLanding from './components/HelpLanding/HelpLanding';
// import Inventory from './components/userTabs';
// import Trading from './components/pages/Trading';
import StockTicker from './components/StockTicker/StockTicker';
import ViewStocks from './pages/ViewStocks/ViewStocks';
import TradingCenter from './components/TradingCenter';
import Friends from './pages/Social/Friends';

/**
<<<<<<< HEAD
 * Class App
 */
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      sideNav: false,
    };
    this.navToggleHandler = this.navToggleHandler.bind(this);
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
        <div className='App'>
          <header className='App-header'>
            <h1 className='App-title'>Welcome to React</h1>
          </header>
          <Switch>
            <Route exact path='/login' component={SigninForm} />
            <Route exact path='/logout' component={SignoutForm} />
            <Route exact path='/signup' component={SignupForm} />

          </Switch>
          <CollapseRow />
        </div>
        <Router>

          <div className="App">
            <TopNav navToggleHandler={this.navToggleHandler} />
=======
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
  };
  this.navToggleHandler = this.navToggleHandler.bind(this);
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
        <div className="App">
            <TopNav navToggleHandler={this.navToggleHandler}/>
>>>>>>> 93f713b1f603283e46adf96f25ee0d8ab01638c8
            <Wrapper>
              <SideNav isActive={this.state.sideNav} />
              <MainContentWrapper>
                <PortfolioStatus />
                <StockTicker />
                <Content>
<<<<<<< HEAD
                  <Switch>
                    <Route exact path="/petfolio" component={Petfolio} />
                    <Route exact path='/trading' component={Trading} />
                    <Route exact path='/viewstocks' component={ViewStocks} />
                    <Route exact path='/help' component={HelpLanding} />
                    <Route exact path='/docs' component={DocsList} />
                  </Switch>
=======
                <Switch>
                <Route exact path="/petfolio" component={Petfolio} />
                      <Route exact path='/splash' component={Splash} />
                      <Route exact path='/forum' component={Forum} />
                      {/* <Route exact path='/petcenter' component={PetCenter} />
                      <Route exact path='/friends' component={Friends} />
                      // <Route exact path='/forum' component={Forum} />}
                      <Route exact path='/' component={Home} />
                      <Route exact path='/about' component={About} />
                      {/* <Route exact path='/settings' component={Settings} /> */}
                      {/* <Route exact path='/logout' component={Logout} /> */}
                      <Route exact path='/signup' component={SignUp} />
                      {/* <Route exact path='/achievements' component={Achievements} /> */}
                      <Route exact path='/friends' component={Friends} />
                      <Route exact path='/viewstocks' component={ViewStocks} />
                      <Route exact path='/help' component={HelpLanding} />
                      <Route exact path='/docs' component={DocsList} />
                      <Route exact path='/viewstocks' component={ViewStocks} />
                      <Route exact path='/trading' component={TradingCenter} />
                      <Route exact path='/trading/:ticker' component={TradingCenter} />
                      </Switch>
>>>>>>> 93f713b1f603283e46adf96f25ee0d8ab01638c8
                </Content>
              </MainContentWrapper>
            </Wrapper>
          </div>
        </Router>
      </Router>
    );
  };
}

export default App;
