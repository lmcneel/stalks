import React, {Component} from 'react';
import {Card, CardBody, CardTitle, Col, Row} from 'reactstrap';
// import API from '../../utils/API';

// component to list current user friends on render
export class FriendList extends Component {
    //     constructor(props) {
    //         super(props);
    //         state = {
    //          friends: 0,
    //           };

    //     };

    //     componentDidMount() {
    //         this.showFriends();

    //     };

    // // Query for user friends will go here!!! from mysql
    // showFriends = () => {
    //     API.whatgoeshere()
    //         .then(res => this.setState({whatgoeshere}))
    //         .catch(err => console.log(err));
    // }

    render() {
        return (

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

        );
    }
};

