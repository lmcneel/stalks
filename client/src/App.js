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
import { settings } from 'cluster';

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
                      <Route exact path='/petcetner' component={PetCenter} />
                      <Route exact path='/friends' component={Friends} />
                      <Route exact path='/forum' component={Forum} />
                      <Route exact path='/' component={Home} />
                      <Route exact path='/about' component={About} />
                      <Route exact path='/settings' component={settings} />
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
