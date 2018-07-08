import React, {Component} from 'react';
import DocsList from './components/DocsList/DocsList';
import RadioYesNo from './components/RadioYesNo/index';
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
        <DocsList />
        <CollapseRow />
        <HelpCard/>
      </div>
    );
  }
}
export default App;
