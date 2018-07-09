import React, {Component} from 'react';
import TopNav from "./components/TopNav";
import Wrapper from "./components/Wrapper";
import SideNav from './components/SideNav';
import MainContentWrapper from './components/MainContentWrapper';
import PortfolioStatus from './components/PortfolioStatus';
import WatchlistTicker from './components/WatchlistTicker';
import Content from './components/Content';



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
    );
  }
}
export default App;
