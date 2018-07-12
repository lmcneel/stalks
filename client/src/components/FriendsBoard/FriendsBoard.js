import React from "react";
import {Card, CardText, CardBody, CardTitle, Navbar, Nav, NavItem, NavLink, Col, Row, Button, Container} from "reactstrap";

export const FriendsBoard = (props) => {

return(
<Container fluid>
    <Row>
    <Col sm="8" md={{ size: 8, offset: 3 }}>
            <Card color="light">
                <CardBody>
                    <CardTitle>Friends Board</CardTitle>
                        <Navbar color="light" light expand="md">
                            <Nav navbar>
                                <NavItem>
                                    <NavLink href="">Friend List</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="">|   Friend Request   |</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="">Friend Search</NavLink>
                                </NavItem>
                            </Nav>
                        </Navbar> 
                        <CardText>
                         
                        </CardText>   
                </CardBody>
            </Card>
        </Col>
    </Row>
</Container>
)
};
