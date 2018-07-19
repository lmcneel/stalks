import React, {Component} from 'react';
// import {} from "reactstrap";

/**
 * Class Test
 */
export class Test extends Component {
  /**
  *@param {*} props
  */
    constructor(props) {
      super(props);

      this.toggle = this.toggle.bind(this);
      this.state = {
        dropdownOpen: false,
      };
    }

    toggle() {
      this.setState((prevState) => ({
        dropdownOpen: !prevState.dropdownOpen,
      }));
    }

    render() {
      return (
<p>HELLO WORLD!!!!!!!!</p>
      );
    }
  }
