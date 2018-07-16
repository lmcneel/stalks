import React, {Component} from 'react';
import {Card, CardBody, CardTitle, Col, Row} from 'reactstrap';
// import API from '../../utils/API';

// FriendRequest component that will render all user pending friend request on render
export class FriendRequest extends Component {
    constructor(props) {
        super(props);
    };

componentDidMount() {
// Query for current friend request will go here!!!

};

// function to accept or deny friend request will go here!!!
render() {
return (

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
);
}
};

