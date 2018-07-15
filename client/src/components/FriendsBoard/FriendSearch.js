import React, {Component} from 'react';
import {Card, CardText, CardBody, CardTitle, Col, Row, Button} from 'reactstrap';
// import API from '../../utils/API';

// Component to serch for friends by name
export class FriendSearch extends Component {
    constructor(props) {
        super(props);
    };

    componentDidMount() {
        // Query for friend search by name will go here!!!

    };


    // Functon to Request a Freind will go here!!!

    render() {
        return (

            <Card>
                <CardBody>
                    <div>
                        <Row>
                            <Col sm="12">
                                <Card color="light">
                                    <CardBody>
                                        <CardTitle>
                                            Friend Search
                            </CardTitle>
                                        <CardText>
                                            <input placeholder="Friend User Name">
                                            </input>
                                            <Button>
                                                Search
                                        </Button>
                                        </CardText>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </CardBody>
            </Card>
        );
    }
};

