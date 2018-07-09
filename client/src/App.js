import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Inventory from './components/userFoodAndToys';
import UserCard from './components/card';

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
        <UserCard />
      </div>
    );
  }
}
export default App;
