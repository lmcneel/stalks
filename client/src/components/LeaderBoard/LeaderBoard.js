import React, {Component} from "react";
import {
  Card, CardText, CardBody, Container,
  CardTitle, CardSubtitle, Col, Row
} from 'reactstrap';
import API from '../../utils/API';

export class LeaderBoard extends Component {

  constructor(props) {
    super(props);

  };

  ComponentDidMount() {
    // Query for current top scores will go here based on protfolio value

  };

  render() {

    return (

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
    )
  }
};

export default LeaderBoard;