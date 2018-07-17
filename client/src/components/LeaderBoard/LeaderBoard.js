import React, {Component} from 'react';
import {
  Card, CardText, CardBody, Container,
  CardTitle, CardSubtitle, Col, Row,
} from 'reactstrap';
// import API from '../../utils/API';


/**
* Class LeaderBoard
*/
export class LeaderBoard extends Component {
  /**
  *@param {*} props
  */
  constructor(props) {
    super(props);
  };

  /**
   * Mount component
   */
  ComponentDidMount() {
    // Query for current top scores will go here based on protfolio value

  };
/**
 * Render function for App Component
 * @return {JSX}
 */
  render() {
    return (

      <Container>
        <Row>
          <Col sm="8" md={{size: 11, offset: 0}}>

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
  }
};

export default LeaderBoard;
