import React from "react";
import { Card, CardText, CardBody, Container,
    CardTitle, CardSubtitle, Col, Row } from 'reactstrap';

export const LeaderBoard = (props) => (



<Container>
  <Row>
    <Col sm="8" md={{ size: 11, offset: 0 }}>
      <Card color="light">
        <CardBody>
          <CardTitle>
            Leaderboard
          </CardTitle>
            <CardSubtitle>
             Leaderboard 
            </CardSubtitle> 
            <CardText>
              Leaderboard
            </CardText> 
        </CardBody>
      </Card> 
    </Col>
  </Row>
</Container>

);
