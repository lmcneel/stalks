import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

// A simple component that shows the pathname of the current location
class ShowTheLocation extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  render() {
    const { match, location, history } = this.props;
    const pageRoute = location.pathname;
    let pageName = pageRoute.split('');
    console.log(pageName);
    pageName.shift();
    return (
      <div><h1>{pageName}</h1></div>
    )
  }
}
const Title = withRouter(ShowTheLocation);

export default Title;