import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
        PropTypes.string,
        PropTypes.element,
    ]),
};

const MainContentWrapper = (props) => <div id="content-wrapper">{props.children}</div>;

MainContentWrapper.propTypes = propTypes;
export default MainContentWrapper;
