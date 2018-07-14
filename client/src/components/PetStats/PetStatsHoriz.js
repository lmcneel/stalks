import React from 'react';
import {Container, Row, Col} from 'reactstrap';
import PetStatusBars from '../PetStats/PetStatusBars';
import PetPic from '../PetStats/PetPic';
import PetName from '../PetStats/PetName';

const PetStatsHoriz = () => {
    return (
      <div>
        <Container>
          <Row>

            <Col>
            <div>
              <PetPic />
            </div>
            </Col>

            <Col>
            <div>
              <PetName />
            </div>
            <div>
              <PetStatusBars />
            </div>
            </Col>

          </Row>
        </Container>
      </div>
    );
};

export default PetStatsHoriz;

