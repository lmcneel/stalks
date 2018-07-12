import React from "react";
import {Card, CardText, CardBody, CardTitle, Navbar, Nav, NavItem, NavLink, Col, Row, Button, Container} from "reactstrap";

export const FriendSearch = (props) => {

return(
<Container fluid>
    <Row>
    <Col sm="12">
            <Card color="light">
                <CardBody>
                    <CardTitle>Friend Search</CardTitle>
                        <CardText>
                            <input placeholder="Friend User Name"></input>
                            <Button>Search</Button>
                        </CardText>   
                </CardBody>
            </Card>
        </Col>
    </Row>
</Container>
)
};

