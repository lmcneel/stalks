import React from "react";
import {Card, CardText, CardBody, CardTitle, Navbar, Nav, NavItem, NavLink, Col, Row} from "reactstrap";


// FriendRequest component that will render all user pending friend request on render
export const FriendRequest = (props) => {
    
    return(

<Card>
    <CardBody>        
        <div>
            <Row>
                <Col sm="12">
                    <Card color="light">
                        <CardBody>
                            <CardTitle>Friend Request</CardTitle>    
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    </CardBody>
</Card>
)
};

