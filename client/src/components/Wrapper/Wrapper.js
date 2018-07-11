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

const Wrapper = (props) => <div className="wrapper">{props.children}</div>;

Wrapper.propTypes = propTypes;
export default Wrapper;
