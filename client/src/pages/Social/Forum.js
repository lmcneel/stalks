import React, {Component} from 'react';
import {Container, Row} from 'reactstrap';
import {Forum} from '../../components/FriendsBoard';
// import API from './../../utils/API';


class ForumPage extends Component {
render() {
    return (

<Container fluid>
    <Row>
       <Forum/>
    </Row>

</Container>
);
}
};

export default ForumPage;
