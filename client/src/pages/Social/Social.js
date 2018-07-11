import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import {FriendRequest, FriendSearch, FriendList, Forum} from '../../components/FriendsBoard';
import '../../assets/scss/_social.scss';
import API from './../../utils/API';


class Social extends Component {

render() {
    return (

<Container fluid>
    <Row>
        <Forum/>
        <FriendRequest/>
        <FriendSearch/>
        <FriendList/>
    </Row>
</Container>
);
}
};




    export default Social;