import React, {Component} from 'react';
import Splash from './components/Splash';
import TopNav from './components/TopNav';
import Wrapper from './components/Wrapper';
import SideNav from './components/SideNav';
import MainContentWrapper from './components/MainContentWrapper';
import PortfolioStatus from './components/PortfolioStatus';
import Content from './components/Content';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
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
import UserSettings from './pages/Settings';
import Trading from './components/pages/Trading';
import StockTicker from './components/StockTicker/StockTicker';
import Login from './pages/Login';

/**
 * Class App
 */
class App extends Component {
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
            <Wrapper>
              <SideNav isActive={this.state.sideNav}/>
              <MainContentWrapper>
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
                      {/* <Route exact path='/logout' component={Logout} /> */}
                      <Route exact path='/signup' component={SignUp} />
                      <Route exact path='/login' component={Login} />
                      {/* <Route exact path='/achievements' component={Achievements} /> */}
                      <Route exact path='/viewstocks' component={ViewStocks} />
                      <Route exact path='/help' component={HelpLanding} />
                      <Route exact path='/docs' component={DocsList} />
                      <Route path='/settings' component={UserSettings} />
                    </Switch>
                </Content>
                </MainContentWrapper>
              </Wrapper>
        </div>
      </Router>
    );
  };
}

export default App;
