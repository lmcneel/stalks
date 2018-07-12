import React from "react";
import {Card, CardText, CardBody, CardTitle, Navbar, Nav, NavItem, NavLink, Col, Row} from 'reactstrap';

export const FriendList = (props) => {

    return(
<div>
    <Row>
        <Col sm="12">
            <Card color="light">
                <CardBody>
                    <CardTitle>Friend List</CardTitle>
                        <Navbar color="light" light expand="md">
                            <Nav navbar>
                                <NavItem>
                                    <NavLink href="">Friend List</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="">|   FriendRequest   |</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="">Friend List</NavLink>
                                </NavItem>
                            </Nav>
                        </Navbar>    
                </CardBody>
            </Card>
        </Col>
    </Row>
</div>
    )
};

