import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import {FriendRequest, FriendSearch, FriendList, FriendsBoard, Forum, Test} from '../../components/FriendsBoard';
import '../../assets/scss/_social.scss';
import API from './../../utils/API';


class Social extends Component {

render() {
    return (

<Container fluid>
    <Row>
        <Forum/>
        {/* <FriendRequest/> */}
        <FriendsBoard/>
        {/* <FriendList/> */}
        <Test/>
    </Row>
</Container>
);
}
};




    export default Social;