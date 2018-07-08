import React, {Component} from 'react';
import DocsList from './components/DocsList/DocsList';
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
        <DocsList />
      </div>
    );
  }
}
export default App;
