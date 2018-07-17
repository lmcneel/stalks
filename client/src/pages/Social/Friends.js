import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import {FriendsBoard} from '../../components/FriendsBoard';
import {LeaderBoard} from '../../components/LeaderBoard/LeaderBoard.js';
import '../../assets/scss/_social.scss';
/**
 * import API from './../../utils/API';
 */


class Social extends Component {
render() {
    return (

<Container fluid>
    <Col>
        <Row>
            <LeaderBoard/>
        </Row>
        <Row>
            <FriendsBoard/>
        </Row>
    </Col>
</Container>
);
}
};


    export default Social;
