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
<<<<<<< HEAD
import Social from './pages/Social/Social.js';
=======
import ViewStocks from './pages/ViewStocks';
import DocsList from './components/DocsList/DocsList';
import HelpLanding from './components/HelpLanding/HelpLanding';
import Inventory from './components/userTabs';
>>>>>>> 8bed74f11cb863fe1ff3966a951ae281e29ccfc7

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
<<<<<<< HEAD
        <div>
          <Switch>
            <Route exact path="/petfolio" component={Petfolio} />
            <Route exact path='/trading' component={Trading} />
            <Route exact path= "/social" component={Social} />
           </Switch>
=======

        <div className="App">
            <TopNav navToggleHandler={this.navToggleHandler}/>
            <Wrapper>
              <SideNav isActive={this.state.sideNav}/>
              <MainContentWrapper>
                <PortfolioStatus />
                <WatchlistTicker />
                <Inventory />
                <Content>
                    <Switch>
                      <Route exact path="/petfolio" component={Petfolio} />
                      <Route exact path='/trading' component={Trading} />
                      <Route exact path='/viewstocks' component={ViewStocks} />
                      <Route exact path='/help' component={HelpLanding} />
                      <Route exact path='/docs' component={DocsList} />
                    </Switch>
                </Content>
                </MainContentWrapper>
              </Wrapper>
>>>>>>> 8bed74f11cb863fe1ff3966a951ae281e29ccfc7
        </div>
      </Router>
    );
  }
}

export default App;
