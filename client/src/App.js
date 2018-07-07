import React, {Component} from 'react';
import './App.css';
import Inventory from './components/userFoodAndToys';

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
      <div>
        <Inventory />
      </div>
    );
  }
}
export default App;
