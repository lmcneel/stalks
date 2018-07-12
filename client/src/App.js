import React, {Component} from 'react';
<<<<<<< HEAD
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import CollapseRow from './components/CollapseRow/index';
import SigninForm from './components/SigninForm';
import SignupForm from './components/SignupForm';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faFacebookF, faGoogle} from '@fortawesome/fontawesome-free-brands';
import {faAt, faKey} from '@fortawesome/fontawesome-free-solid';

library.add(faFacebookF|faGoogle|faAt|faKey);
=======
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
import ViewStocks from './pages/ViewStocks';
import DocsList from './components/DocsList/DocsList';
import HelpLanding from './components/HelpLanding/HelpLanding';
import Inventory from './components/userTabs';
>>>>>>> profile-issue

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
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>Welcome to React</h1>
        </header>
          <Switch>
            <Route exact path='/login' component={SigninForm} />
            <Route exact path='/signup' component={SignupForm} />
          </Switch>
        <CollapseRow />
      </div>
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
                      <Route exact path='/settings' component={UserSettings} />
                    </Switch>
                </Content>
                </MainContentWrapper>
              </Wrapper>
        </div>
>>>>>>> profile-issue
      </Router>
    );
  };
}

export default App;
