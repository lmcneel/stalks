import React, {Component} from 'react';
import CollapseRow from './components/CollapseRow/index';
import RadioYesNo from './components/RadioYesNo/index';

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
      </div>
    );
  }
}
export default App;
