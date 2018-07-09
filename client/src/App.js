import React, {Component} from 'react';
import TopNav from "./components/TopNav";
import Wrapper from "./components/Wrapper";
import SideNav from './components/SideNav';
import MainContentWrapper from './components/MainContentWrapper';
import PortfolioStatus from './components/PortfolioStatus';
import WatchlistTicker from './components/WatchlistTicker';
import Content from './components/Content';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Petfolio from './pages/Petfolio';
import Trading from './pages/Trading';

/**
 * Class App
 */
class App extends Component {
  /**
   * 
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
      <div className="App">
        <TopNav navToggleHandler={this.navToggleHandler}/>
        <Wrapper>
          <SideNav isActive={this.state.sideNav}/>
          <MainContentWrapper>
            <PortfolioStatus />
            <WatchlistTicker />
            <Content>
              <Router>
                <Switch>
                  <Route exact path="/petfolio" component={Petfolio} />
                  <Route exact path='/trading' component={Trading} />
                </Switch>
              </Router>
            </Content>
            </MainContentWrapper>
          </Wrapper>
      </div>
    );
  }
}
export default App;

