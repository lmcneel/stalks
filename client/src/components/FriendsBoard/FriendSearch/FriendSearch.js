import React from "react";
import {Card, CardText, CardBody, CardTitle, Button, Navbar, Nav, NavItem, NavLink, Co, Row} from reactstrap;

const FriendSearch = (props) => (
<div>
    <Row>
        <Col sm="5">
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
                        <CardText>
                            <input placeholder="Friend User Name"></input>
                            <Button>Search</Button>
                        </CardText>   
                </CardBody>
            </Card>
        </Col>
    </Row>
</div>
);

export default FreindSearch;