import React from 'react';
import {Container, Row, Col} from 'reactstrap';

export const PetWrapper = (props) => {
    return (
      <div className="wrapper">
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
