import React from "react";
import "./LeaderBoard.css";
import { Card, CardText, CardBody,
    CardTitle, CardSubtitle, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Col, Row } from 'reactstrap';

const LeaderBoard = (props) => (


<div>
  <Row>
    <Col sm="5">
      <Card color="light">
        <CardBody>
          <CardTitle>
            Leaderboard
          </CardTitle>
            <CardSubtitle>
              See your Friends:
            </CardSubtitle> 
        </CardBody>
      </Card> 
    </Col>
  </Row>
</div>
);

export default LeaderBoard;