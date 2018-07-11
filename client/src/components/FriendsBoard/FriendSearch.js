import React from "react";
import {Card, CardText, CardBody, CardTitle, Navbar, Nav, NavItem, NavLink, Col, Row, Button} from "reactstrap";

export const FriendSearch = (props) => {

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
                        <CardText>
                            <input placeholder="Friend User Name"></input>
                            <Button>Search</Button>
                        </CardText>   
                </CardBody>
            </Card>
        </Col>
    </Row>
</div>
)
};

