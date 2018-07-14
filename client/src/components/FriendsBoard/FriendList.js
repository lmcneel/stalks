import React from "react";
import {Card, CardText, CardBody, CardTitle, Navbar, Nav, NavItem, NavLink, Col, Row} from 'reactstrap';

// Component to list current user friends on render
export const FriendList = (props) => {

    return(

<Card>
    <CardBody>
        <div>

            <Row>
                <Col sm="12">
                    <Card color="light">
                        <CardBody>
                            <CardTitle>Friend List</CardTitle>
        
                        </CardBody>
                    </Card>
                </Col>
            </Row>
              
        </div>
    </CardBody>
</Card>
)
};

