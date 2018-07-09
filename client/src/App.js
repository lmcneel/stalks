import React, {Component} from 'react';
import TopNav from "./components/TopNav";
import Wrapper from "./components/Wrapper";
import SideNav from './components/SideNav';
import MainContentWrapper from './components/MainContentWrapper';
import PortfolioStatus from './components/PortfolioStatus';
import WatchlistTicker from './components/WatchlistTicker';
import Content from './components/Content';


// import CollapseRow from './components/CollapseRow/index';
// import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
// import Petfolio from './pages/Petfolio';
// import Trading from './pages/Trading';

/**
 * Class App
 */
class App extends Component {
  /**
   * Render function for App Component
   * @return {JSX}
   */
  render() {
    return (
      <div className="App">
        <TopNav />
        <Wrapper>
          <SideNav/>
          <MainContentWrapper>
            <PortfolioStatus />
            <WatchlistTicker />
            <Content />
            </MainContentWrapper>
          </Wrapper>
      </div>

      // <Router>
      //   <div>
      //     <Switch>
      //       <Route exact path="/petfolio" component={Petfolio} />
      //       <Route exact path='/trading' component={Trading} />
      //     </Switch>
      //   </div>
      // </Router>
    );
  }
}
export default App;

