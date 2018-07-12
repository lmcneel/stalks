import React from 'react';
import {Container, Row, Col} from 'reactstrap';

export const PetWrapper = (props) => {
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