import React from 'react';
import {Container, Row, Col} from 'reactstrap';
import PropTypes from 'prop-types';

const propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
        PropTypes.string,
    ]),
};
const PetWrapper = (props) => {
    return (
      <div className="wrapper stockStats">
        <Container>
          <Row>
            <Col>
            {props.children}
            </Col>
          </Row>
        </Container>
      </div>
    );
};
PetWrapper.propTypes = propTypes;
export {PetWrapper};

