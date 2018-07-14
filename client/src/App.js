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
import TradingCenter from './components/TradingCenter';
import ViewStocks from './pages/ViewStocks';
import ListHoldings from './pages/ListHoldings';
import DocsList from './components/DocsList/DocsList';
import HelpLanding from './components/HelpLanding/HelpLanding';
import Inventory from './components/userTabs';


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
                <Inventory />
                <Content>
                <Switch>
                      <Route exact path="/petfolio" component={Petfolio} />
                      <Route exact path='/trading' component={TradingCenter} />
                      <Route exact path='/trading/:ticker' component={TradingCenter} />
                      <Route exact path='/viewstocks' component={ViewStocks} />
                      <Route exact path='/help' component={HelpLanding} />
                      <Route exact path='/docs' component={DocsList} />
                      <Route exact path='/ownedstocks' component={ListHoldings} />
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
