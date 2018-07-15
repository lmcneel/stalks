import React, {Component} from 'react';
import {Card, CardBody, CardTitle, Col, Row, Icon} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faWindowClose} from '@fortawesome/fontawesome-free-solid';
// import API from '../../utils/API';

// component to list current user friends on render
export class FriendList extends Component {
    constructor(props) {
        super(props);         
        this.state = { nav1: false, nav2: false, nav3: false};
    };   

// // Function to toggle this.state.nav1 for displaying FriendList component
// toggleNav1 = () =>{
//     this.setState({
//         nav1: !this.state.nav1
//     });
// };
    // // Query for user friends will go here!!! from mysql
    // showFriends = () => {
    //     API.whatgoeshere()
    //         .then(res => this.setState({whatgoeshere}))
    //         .catch(err => console.log(err));
    // }

    render() {
        return (

            <Card>
                <FontAwesomeIcon
    icon={faWindowClose} onClick={this.props.toggleNav1} nav1={this.props.false} />
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

