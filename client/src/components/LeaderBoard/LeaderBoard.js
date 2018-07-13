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
            <Card>
            <CardBody> 
            <CardText>
              Leaderboard ITEMS WILL GO HERE!
            </CardText>
            </CardBody>
            </Card> 
        </CardBody>
      </Card> 
    </Col>
  </Row>
</Container>

);

