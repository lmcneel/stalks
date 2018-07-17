import React from 'react';
import {Container, Row, Col} from 'reactstrap';
import PetStatusBars from '../PetStats/PetStatusBars';
import PetPic from '../PetStats/PetPic';
import PetName from '../PetStats/PetName';

export const PetStatsVert = () => {
    return (
      <div>
        <Container>
          <Row>
            <Col>

            <div>
              <PetPic />
            </div>
            <div>
              <PetName />
            </div>
            <div className="petStatsBars">
              <PetStatusBars />
            </div>

            </Col>
          </Row>
        </Container>
      </div>
    );
};

