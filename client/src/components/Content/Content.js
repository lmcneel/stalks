import React from 'react';
import {Container} from 'reactstrap';
import PropTypes from 'prop-types';


const propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
        PropTypes.object,
        PropTypes.string]),
};


const Content = (props) => (
    <Container fluid id="content" className="mt-3">
       {props.children}
    </Container>
);

Content.propTypes = propTypes;

export default Content;
