import React, {Component} from 'react';
import CollapseRow from './components/CollapseRow/index';

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
      <Router>
      <div className="App">
        <CollapseRow />
      </div>
      </Router>
    );
  }
}
export default App;
