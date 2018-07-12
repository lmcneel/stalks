import React, {Component} from 'react';
import TopNav from './components/TopNav';
import Wrapper from './components/Wrapper';
import SideNav from './components/SideNav';
import MainContentWrapper from './components/MainContentWrapper';
import PortfolioStatus from './components/PortfolioStatus';
import WatchlistTicker from './components/WatchlistTicker';
import Content from './components/Content';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Petfolio from './pages/Petfolio';
import Trading from './pages/Trading';
// import PetCenter from './components/pages/PetCenter';
// import Forum from './components/pages/Forum';
// import Friends from './components/pages/Friends';
import Home from './pages/Home';
import About from './pages/About';
// import Settings from './components/pages/Settings';
// import Login from './components/pages/Login';
// import Logout from './components/pages/Logout';
// import SignUp from './components/pages/SignUp';
// import Achievements from './components/pages/Achievements';

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
                <WatchlistTicker />
                <Content>
                <Switch>
                      <Route exact path="/petfolio" component={Petfolio} />
                      <Route exact path='/trading' component={Trading} />
                      {/* <Route exact path='/petcenter' component={PetCenter} />
                      <Route exact path='/friends' component={Friends} />
                      <Route exact path='/forum' component={Forum} /> */}
                      <Route exact path='/' component={Home} />
                      <Route exact path='/about' component={About} />
                      {/* <Route exact path='/settings' component={Settings} />
                      <Route exact path='/login' component={Login} />
                      <Route exact path='/logout' component={Logout} />
                      <Route exact path='/signup' component={SignUp} />
                      <Route exact path='/achievements' component={Achievements} /> */}
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
