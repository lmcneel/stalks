import React, {Component} from 'react';
import CollapseRow from './components/CollapseRow/index';
import HelpCard from './components/HelpCard/index';

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
        <CollapseRow />
        <HelpCard/>
      </div>
    );
  }
}
export default App;
